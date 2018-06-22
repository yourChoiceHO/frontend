import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Row,
  Upload
} from "antd";
import locale from "antd/lib/date-picker/locale/de_DE";
import { FormComponentProps } from "antd/lib/form";
import classNames from "classnames/bind";
import Future from "fluture";
import {
  addIndex,
  eqProps,
  has,
  isEmpty,
  map,
  pathOr,
  propEq,
  reject
} from "ramda";
import React, { Component } from "react";

import Styles from "@/components/pages/styles/hide.less";
import AuthenticationContainer from "@/containers/Authentication";
import connect from "@/containers/connect";
import ElectionContainer from "@/containers/Election";
import api from "@/lib/api";
import { ElectionStateTypes, ElectionTypes, Role } from "@/types/model";
import { isDefined } from "@/utils";
import {
  shouldShowCandidateList,
  shouldShowPartyList,
  shouldShowTopicList
} from "@/utils/election";

const cx = classNames.bind(Styles);
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const mapIndexed = addIndex(map);
const filterUploads = reject(propEq("__status__", "uploaded"));
const foldResponse = Future.fold(error => ({ error }), result => ({ result }));
const removeFromList = (item, list) => reject(propEq("uid", item.uid), list);

interface IUserFormProps extends FormComponentProps {
  election: ElectionContainer;
  id?: number;
  client_id: number;
  id_election: number;
  state: number;
  text: string;
  typ: { value: string };
  authentication: AuthenticationContainer;
}

class ElectionForm extends Component<IUserFormProps, {}> {
  // Immediate refactoring required. It work's but is very redundant.
  public static getDerivedStateFromProps(props, state) {
    const constituencies = pathOr({}, ["constituencies"], props);

    if (props.edit && !isEmpty(constituencies) && !state.listsImported) {
      const voters = pathOr([], ["voter"], constituencies);
      const parties = pathOr([], ["party"], constituencies);
      const candidates = pathOr([], ["candidates"], constituencies);
      const referendums = pathOr([], ["referendum"], constituencies);

      let updates = {};

      const votersFileList = voters.map(({ constituency }) => ({
        __status__: "uploaded",
        name: `Wahlkreis ${constituency}`,
        uid: constituency
      }));

      const partiesFileList = parties.map(({ constituency }) => ({
        __status__: "uploaded",
        name: `Wahlkreis ${constituency}`,
        uid: constituency
      }));

      const candidatesFileList = candidates.map(({ constituency }) => ({
        __status__: "uploaded",
        name: `Wahlkreis ${constituency}`,
        uid: constituency
      }));

      const referendumsFileList = referendums.map(({ constituency }) => ({
        __status__: "uploaded",
        name: `Thema`,
        uid: constituency
      }));

      if (isEmpty(state.candidatesFileList) && !isEmpty(candidatesFileList)) {
        updates = { ...updates, candidatesFileList };
      }

      if (isEmpty(state.partiesFileList) && !isEmpty(partiesFileList)) {
        updates = { ...updates, partiesFileList };
      }

      if (isEmpty(state.votersFileList) && !isEmpty(votersFileList)) {
        updates = { ...updates, votersFileList };
      }

      if (isEmpty(state.referendumsFileList) && !isEmpty(referendumsFileList)) {
        updates = { ...updates, referendumsFileList };
      }

      if (!isEmpty(updates)) {
        return { ...updates, listsImported: true };
      }
    }

    return null;
  }

  public state = {
    candidatesFileList: [],
    partiesFileList: [],
    referendumsFileList: [],
    votersFileList: [],
    listsImported: false,
    pending: false,
    createdEelection: {}
  };

  // Immediate refactoring required. It work's but is very redundant.
  public handleUpload = electionId => {
    this.setState({ pending: true });

    const {
      addCandidates,
      addParties,
      addReferendums,
      addVoters
    } = api.election;

    const {
      candidatesFileList,
      partiesFileList,
      referendumsFileList,
      votersFileList
    } = this.state;

    const candidates = filterUploads(candidatesFileList);
    const parties = filterUploads(partiesFileList);
    const referendums = filterUploads(referendumsFileList);
    const voters = filterUploads(votersFileList);

    const candidatesTask = Future.parallel(
      2,
      candidates.map(addCandidates(electionId)).map(foldResponse)
    );

    const partiesTask = Future.parallel(
      2,
      parties.map(addParties(electionId)).map(foldResponse)
    );

    const referendumsTask = Future.parallel(
      2,
      referendums.map(addReferendums(electionId)).map(foldResponse)
    );

    const votersTask = Future.parallel(
      2,
      voters.map(addVoters(electionId)).map(foldResponse)
    );

    const requests = [candidatesTask, partiesTask, referendumsTask, votersTask];

    Future.parallel(12, requests).fork(
      console.error,
      ([
        candidatesResponse,
        partiesResponse,
        referendumsResponse,
        votersResponse
      ]) => {
        let newCandidatesFileList = candidatesFileList;
        let newPartiesFileList = partiesFileList;
        let newReferendumsFileList = referendumsFileList;
        let newVotersFileList = votersFileList;

        const nameEquals = eqProps("name");
        const uidEquals = eqProps("uid");
        const lastModifiedEquals = eqProps("lastModified");

        const processResponse = (response, file) => {
          let data = {};

          if (has("error", response)) {
            message.error(`[${file.name}] konnte nicht hochgeladen werden`);
            data = {
              name: file.name,
              lastModified: file.lastModified,
              uid: file.uid,
              status: "error",
              response: "40X"
            };
          } else if (has("result", response)) {
            message.success(`[${file.name}] wurde erfolgreich hochgeladen`);
            data = {
              name: file.name,
              lastModified: file.lastModified,
              uid: file.uid,
              status: "success",
              __status__: "uploaded",
              response: "20X"
            };
          }

          return data;
        };

        mapIndexed((response, index) => {
          const file = candidates[index];
          const data = processResponse(response, file);

          newCandidatesFileList = newCandidatesFileList.map(origFile => {
            if (
              nameEquals(origFile, file) &&
              lastModifiedEquals(origFile, file) &&
              uidEquals(origFile, file)
            ) {
              return data;
            }

            return origFile;
          });
        }, candidatesResponse);

        mapIndexed((response, index) => {
          const file = parties[index];
          const data = processResponse(response, file);

          newPartiesFileList = newPartiesFileList.map(origFile => {
            if (
              nameEquals(origFile, file) &&
              lastModifiedEquals(origFile, file) &&
              uidEquals(origFile, file)
            ) {
              return data;
            }

            return origFile;
          });
        }, partiesResponse);

        mapIndexed((response, index) => {
          const file = referendums[index];
          const data = processResponse(response, file);

          newReferendumsFileList = newReferendumsFileList.map(origFile => {
            if (
              nameEquals(origFile, file) &&
              lastModifiedEquals(origFile, file) &&
              uidEquals(origFile, file)
            ) {
              return data;
            }

            return origFile;
          });
        }, referendumsResponse);

        mapIndexed((response, index) => {
          const file = voters[index];
          const data = processResponse(response, file);

          newVotersFileList = newVotersFileList.map(origFile => {
            if (
              nameEquals(origFile, file) &&
              lastModifiedEquals(origFile, file) &&
              uidEquals(origFile, file)
            ) {
              return data;
            }

            return origFile;
          });
        }, votersResponse);

        this.setState({
          candidatesFileList: newCandidatesFileList,
          partiesFileList: newPartiesFileList,
          referendumsFileList: newReferendumsFileList,
          votersFileList: newVotersFileList,
          pending: false
        });
      }
    );
  };

  public beforeCandidatesUpload = file => {
    this.setState(({ candidatesFileList }) => ({
      candidatesFileList: [...candidatesFileList, file]
    }));
    return false;
  };

  public beforePartiesUpload = file => {
    this.setState(({ partiesFileList }) => ({
      partiesFileList: [...partiesFileList, file]
    }));
    return false;
  };

  public beforeReferendumsUpload = file => {
    this.setState(({ referendumsFileList }) => ({
      referendumsFileList: [...referendumsFileList, file]
    }));
    return false;
  };

  public beforeVotersUpload = file => {
    this.setState(({ votersFileList }) => ({
      votersFileList: [...votersFileList, file]
    }));
    return false;
  };

  public onCandidatesRemove = file => {
    const state = pathOr("", ["__status__"], file);
    const constituencyId = pathOr(-1, ["uid"], file);
    const electionId = this.getElectionId();

    if (state === "uploaded") {
      api.election.removeCandidates(electionId, constituencyId).fork(
        error => {
          this.setState(({ candidatesFileList }) => ({
            candidatesFileList
          }));
        },
        result => {
          this.setState(({ candidatesFileList }) => ({
            candidatesFileList: removeFromList(file, candidatesFileList)
          }));
        }
      );
    } else {
      this.setState(({ candidatesFileList }) => ({
        candidatesFileList: removeFromList(file, candidatesFileList)
      }));
    }
  };

  public onPartiesRemove = file => {
    const state = pathOr("", ["__status__"], file);
    const constituencyId = pathOr(-1, ["uid"], file);
    const electionId = this.getElectionId();

    if (state === "uploaded") {
      api.election.removeParties(electionId, constituencyId).fork(
        error => {
          this.setState(({ partiesFileList }) => ({
            partiesFileList
          }));
        },
        result => {
          this.setState(({ partiesFileList }) => ({
            partiesFileList: removeFromList(file, partiesFileList)
          }));
        }
      );
    } else {
      this.setState(({ partiesFileList }) => ({
        partiesFileList: removeFromList(file, partiesFileList)
      }));
    }
  };

  public onReferendumsRemove = file => {
    const state = pathOr("", ["__status__"], file);
    const constituencyId = pathOr(-1, ["uid"], file);
    const electionId = this.getElectionId();

    if (state === "uploaded") {
      api.election.removeReferendums(electionId, constituencyId).fork(
        error => {
          this.setState(({ referendumsFileList }) => ({
            referendumsFileList
          }));
        },
        result => {
          this.setState(({ referendumsFileList }) => ({
            referendumsFileList: removeFromList(file, referendumsFileList)
          }));
        }
      );
    } else {
      this.setState(({ referendumsFileList }) => ({
        referendumsFileList: removeFromList(file, referendumsFileList)
      }));
    }
  };

  public onVotersRemove = file => {
    const state = pathOr("", ["__status__"], file);
    const constituencyId = pathOr(-1, ["uid"], file);
    const electionId = this.getElectionId();

    if (state === "uploaded") {
      api.election.removeVoters(electionId, constituencyId).fork(
        error => {
          this.setState(({ votersFileList }) => ({
            votersFileList
          }));
        },
        result => {
          this.setState(({ votersFileList }) => ({
            votersFileList: removeFromList(file, votersFileList)
          }));
        }
      );
    } else {
      this.setState(({ votersFileList }) => ({
        votersFileList: removeFromList(file, votersFileList)
      }));
    }
  };

  public handleSubmit = (event: any) => {
    event.preventDefault();

    const role = this.props.authentication.getRole();
    let state = -1;

    if (role === Role.Supervisor) {
      state = ElectionStateTypes.Freigegeben;
    } else if (role === Role.Moderator) {
      state = ElectionStateTypes.Pruefung;
    }

    if (state !== -1) {
      this.props.form.setFieldsValue({
        state
      });
    }

    this.setState({ pending: true });
    this.props.form.validateFields((err, values) => {
      this.setState({ pending: false });

      if (isDefined(err)) {
        console.log(err);
      } else {
        this.props.onSubmit(values).fork(console.error, result => {
          if (this.props.edit) {
            message.success("Wahl wurde erfolgreich bearbeitet");
            this.handleUpload(result.id_election);
          } else {
            message.success("Wahl wurde erfolgreich gespeichert");
            this.setState({ createdElection: result });
            this.handleUpload(result.id_election);
          }
        });
      }
    });
  };

  public getElectionId = () => {
    return this.props.edit
      ? this.props.id
      : this.state.createdElection.id_election;
  };

  public render() {
    const {
      edit,
      fields,
      form: { getFieldDecorator, getFieldValue }
    } = this.props;

    const { pending } = this.state;

    const type = pathOr(-1, ["typ", "value"], fields);
    const showPartyList = shouldShowPartyList(type);
    const showCandidateList = shouldShowCandidateList(type);
    const showTopicList = shouldShowTopicList(type);

    return (
      <Form onSubmit={this.handleSubmit} layout="vertical">
        <Card>
          <Row>
            <Col span={8}>
              <FormItem label="Wahlart">
                {getFieldDecorator("typ", {
                  rules: [
                    {
                      message: "Bitte Wahltyp auswählen!",
                      required: true
                    }
                  ]
                })(
                  <RadioGroup disabled={edit}>
                    <Radio
                      className={cx("radio")}
                      value={ElectionTypes.Europawahl}
                    >
                      Europawahl
                    </Radio>
                    <Radio
                      className={cx("radio")}
                      value={ElectionTypes.Bundestagswahl}
                    >
                      Bundestagswahl
                    </Radio>
                    <Radio
                      className={cx("radio")}
                      value={ElectionTypes.Landtagswahl}
                    >
                      Landtagswahl
                    </Radio>
                    <Radio
                      className={cx("radio")}
                      value={ElectionTypes.Buergermeisterwahl}
                    >
                      Bürgermeisterwahl
                    </Radio>
                    <Radio
                      className={cx("radio")}
                      value={ElectionTypes.Referendum}
                    >
                      Referendum
                    </Radio>
                    <Radio
                      className={cx("radio")}
                      value={ElectionTypes.Kommunalwahl}
                    >
                      Kommunalwahl
                    </Radio>
                    <Radio
                      className={cx("radio")}
                      value={ElectionTypes.LandtagswahlBW}
                    >
                      Landtagswahl (BW)
                    </Radio>
                    <Radio
                      className={cx("radio")}
                      value={ElectionTypes.LandtagswahlSL}
                    >
                      Landtagswahl (SL)
                    </Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="Startzeitpunkt">
                {getFieldDecorator("start_date", {
                  rules: [
                    {
                      message: "Bitte Startzeitpunkt festlegen!",
                      required: true
                    },
                    {
                      message:
                        "Startzeitpunkt muss zwei Wochen vor dem Endzeitpunkt liegen",
                      validator: (rule, value, callback) => {
                        const end = getFieldValue("end_date");
                        const diff = value.diff(end, "week");

                        if (diff === -2) {
                          callback();
                        } else {
                          callback(rule.message);
                        }
                      }
                    }
                  ]
                })(<DatePicker locale={locale} format="DD.MM.YYYY" />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="Endzeitpunkt">
                {getFieldDecorator("end_date", {
                  rules: [
                    {
                      message: "Bitte Endzeitpunkt festlegen!",
                      required: true
                    },
                    {
                      message:
                        "Endzeitpunkt muss zwei Wochen nach dem Startzeitpunkt liegen",
                      validator: (rule, value, callback) => {
                        const start = getFieldValue("start_date");
                        const diff = start.diff(value, "week");

                        if (diff === -2) {
                          callback();
                        } else {
                          callback(rule.message);
                        }
                      }
                    }
                  ]
                })(<DatePicker locale={locale} format="DD.MM.YYYY" />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem label="Beschreibung">
              {getFieldDecorator("text")(
                <Input placeholder="Weitere Informationen zur Wahl" />
              )}
            </FormItem>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="Wählerliste">
                {getFieldDecorator("voters", {
                  rules: [
                    {
                      message: "Bitte Wählerliste importieren!",
                      required: false
                    }
                  ]
                })(
                  <Upload
                    onRemove={this.onVotersRemove}
                    beforeUpload={this.beforeVotersUpload}
                    fileList={this.state.votersFileList}
                  >
                    <Button icon="upload">Wählerliste importieren</Button>
                  </Upload>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              {showPartyList && (
                <FormItem label="Parteienliste">
                  {getFieldDecorator("parties", {
                    rules: [
                      {
                        message: "Bitte Parteienliste importieren!",
                        required: false
                      }
                    ]
                  })(
                    <Upload
                      onRemove={this.onPartiesRemove}
                      beforeUpload={this.beforePartiesUpload}
                      fileList={this.state.partiesFileList}
                    >
                      <Button icon="upload">Parteienliste importieren</Button>
                    </Upload>
                  )}
                </FormItem>
              )}
            </Col>
            <Col span={8}>
              {showCandidateList && (
                <FormItem label="Kandidatenliste">
                  {getFieldDecorator("candidates", {
                    rules: [
                      {
                        message: "Bitte Kandidatenliste importieren!",
                        required: false
                      }
                    ]
                  })(
                    <Upload
                      onRemove={this.onCandidatesRemove}
                      beforeUpload={this.beforeCandidatesUpload}
                      fileList={this.state.candidatesFileList}
                    >
                      <Button icon="upload">Kandidatenliste importieren</Button>
                    </Upload>
                  )}
                </FormItem>
              )}
              {showTopicList && (
                <FormItem label="Themenliste">
                  {getFieldDecorator("topic", {
                    rules: [
                      {
                        message: "Bitte Themenliste importieren!",
                        required: false
                      }
                    ]
                  })(
                    <Upload
                      onRemove={this.onReferendumsRemove}
                      beforeUpload={this.beforeReferendumsUpload}
                      fileList={this.state.referendumsFileList}
                    >
                      <Button icon="upload">Themenliste importieren</Button>
                    </Upload>
                  )}
                </FormItem>
              )}
            </Col>
          </Row>
          <Row>
            <FormItem>
              {getFieldDecorator("state", {
                initialValue: this.props.state,
                rules: [
                  {
                    required: false
                  }
                ]
              })(<Input type="hidden" />)}
            </FormItem>
            <Col push={16} span={8}>
              <Button type="primary" htmlType="submit" loading={pending}>
                Speichern
              </Button>
            </Col>
          </Row>
        </Card>
      </Form>
    );
  }
}

const MyComponentToInjectAuth = Form.create({
  onFieldsChange(props: any, changedFields: any) {
    props.onChange(changedFields);
  },
  mapPropsToFields({ fields }: any) {
    return {
      candidates: Form.createFormField({
        ...fields.candidates,
        value: fields.candidates.value
      }),
      end_date: Form.createFormField({
        ...fields.end_date,
        value: fields.end_date.value
      }),
      parties: Form.createFormField({
        ...fields.parties,
        value: fields.parties.value
      }),
      start_date: Form.createFormField({
        ...fields.start_date,
        value: fields.start_date.value
      }),
      text: Form.createFormField({ ...fields.text, value: fields.text.value }),
      topic: Form.createFormField({
        ...fields.topic,
        value: fields.topic.value
      }),
      typ: Form.createFormField({ ...fields.typ, value: fields.typ.value }),
      voters: Form.createFormField({
        ...fields.voters,
        value: fields.voters.value
      })
    };
  }
})(ElectionForm);

export default connect({
  authentication: AuthenticationContainer,
  election: ElectionContainer
})(MyComponentToInjectAuth);
