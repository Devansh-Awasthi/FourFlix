import axios from "axios";
const Call=axios.create({
  baseURL:'https://api.trakt.tv',
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key": "e05d08fa373e1192315a37425be3a6d41c146336b973e4820c11fdb1b96b1f53"
  }
})
export default Call;