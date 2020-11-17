import React from 'react';
import { Movies } from './movies';
import axios from 'axios';// imported axios

export class Read extends React.Component {


    state = {

        movies: [
        ]
    };
    //  Method Axios get request By using this we dont need to copy all jason data into movie like we did in last week Lab
    componentDidMount() {
        //Getting Json data from new Api local host 4000
        axios.get('http://localhost:4000/api/movies')
            .then(response => {
                this.setState({ movies: response.data })
            })
            .catch((error) => {
                    console.log(error);
                }

            )
    }
    render() {
        return (
            <div>
                <h1>This is read Component.</h1>
                <Movies movies={this.state.movies}></Movies>
            </div>

        );
    }
}
