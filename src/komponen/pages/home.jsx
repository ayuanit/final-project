import React, { Component } from 'react'
import Card from '../components/Cards';
import SearchBar from '../components/search';
import config from '../config/config';
import Button from '../components/Button';

export default class Home extends Component {
  state = {
    accessToken: '',
    isAuthorize: false,
    tracks: [],
  }

  getHashParams() {
    const hashParams = {};
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    let e = r.exec(q);

    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  componentDidMount() {
    const params = this.getHashParams();
    const { access_token: accessToken } = params;

    this.setState({ accessToken, isAuthorize: accessToken !== undefined })
  }

  getSpotifyLinkAuthorize() {
    const state = Date.now().toString();
    const clientId = "00270f4dd41d44a7b91d471158052045";

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000/homework&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  }

  onSuccessSearch(tracks) {
    this.setState({ tracks });
  }

  render() {
    return (
      <>
        {!this.state.isAuthorize && (
          <main className="center">
            <p>Login for next step...</p>
            <Button href={this.getSpotifyLinkAuthorize()}>Authorize</Button>
          </main>
        )}

        {this.state.isAuthorize && (
          <main className="container" id="home">
            <SearchBar
              accessToken={this.state.accessToken}
              onSuccess={(tracks) => this.onSuccessSearch(tracks)}
            />

            <div className="content">
              {this.state.tracks.length === 0 && (
                <p>No tracks</p>
              )}

              <div className="cards">
                {this.state.tracks.map((song) => (
                  <Card
                    key={song.id}
                    imageUrl={song.album.images[0].url}
                    title={song.name}
                    artist={song.artists[0].name}
                  />
                ))}
              </div>
            </div>
          </main>
        )}
      </>
    );
  }
}