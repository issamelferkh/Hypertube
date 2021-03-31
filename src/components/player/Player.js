/** @format */

import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import CustomLanguage from "../../services/DefineLocale";

class Player extends Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.state = {
      subEn: undefined,
      subAr: undefined,
      subFr: undefined,
      subRu: undefined,
    };
    this._isMounted = false;
  }
  async componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      (await axios
        .get("/movie/getSubtitles/" + this.props.movieId)
        .then(async (res) => {
          this._isMounted &&
            (await this.setState({
              subEn:
                res.data.subPathEn !== undefined
                  ? "/static/" + res.data.subPathEn
                  : undefined,
              subFr:
                res.data.subPathFr !== undefined
                  ? "/static/" + res.data.subPathFr
                  : undefined,
              subAr:
                res.data.subPathAr !== undefined
                  ? "/static/" + res.data.subPathAr
                  : undefined,
              subRu:
                res.data.subPathRu !== undefined
                  ? "/static/" + res.data.subPathRu
                  : undefined,
            }));
        })
        .catch((err) => {
          window.location.reload();
        }));
  }
  render() {
    return (
      <GlobalContext.Consumer>
        {(context) => {
          const locale = context.locale;
          var lang = CustomLanguage.define(locale);
          return (
            <video
              className="videoSource"
              controls
              preload="auto"
              onPlay={this.props.updateContextForMovies}
            >
              <source src={this.props.streamURL} type="video/webm" />
              {this.state.subEn !== undefined ? (
                <track
                  label="English"
                  kind="subtitles"
                  srcLang="en"
                  src={this.state.subEn}
                />
              ) : (
                ""
              )}
              {this.state.subFr !== undefined ? (
                <track
                  label="Français"
                  kind="subtitles"
                  srcLang="fr"
                  src={this.state.subFr}
                />
              ) : (
                ""
              )}
              {this.state.subAr !== undefined ? (
                <track
                  label="Arabic"
                  kind="subtitles"
                  srcLang="ar"
                  src={this.state.subAr}
                />
              ) : (
                ""
              )}
              {this.state.subRu !== undefined ? (
                <track
                  label="Ruski"
                  kind="subtitles"
                  srcLang="ru"
                  src={this.state.subRu}
                />
              ) : (
                ""
              )}
              <p className="alert">{lang.movie[0].browser_support_error}</p>
            </video>
          );
        }}
      </GlobalContext.Consumer>
    );
  }
}

export default Player;
