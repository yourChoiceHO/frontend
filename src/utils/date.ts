import moment from "moment";

moment.locale("de");

moment.fn.toJSON = function() {
  return this.format();
};

export default moment;
