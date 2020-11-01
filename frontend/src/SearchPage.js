import React from 'react';
import Card from "react-bootstrap/Card";
import { ListGroupItem, ListGroup, CardGroup, Button } from "react-bootstrap";

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SearchResults: [{}],
            favourites: [],
            keyword: "",
            mediaType: "all",
            resultSet: false,
            showFav: false,
            noFavs: false
        };
    }

    //onchange set state variable to input
    handleKeyword(event) {
        this.setState({ keyword: event.target.value })
    }

    //onchange set state variable to input
    handleMedia(event) {
        this.setState({ mediaType: event.target.value });
    }

    //validates input field then does callout and sets result to state
    search() {

        let term = this.state.keyword;
        let type = this.state.mediaType;
        if (term == "") {
            alert('Please enter keyword');
        } else {
            fetch('/search?term=' + term + '&type=' + type, {
                    method: 'get',
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(res => res.json())
                .then((result) => {
                        this.setState({ SearchResults: result, resultSet: true, showFav: false });
                        console.log(this.state.SearchResults);
                    },
                    (error) => {
                        alert(error);
                    })
        }

    }


    resultsCards() {
        //iterate results from state
        return this.state.SearchResults.map((res, index) => {
            let fullDate = res.releaseDate;
            let year = fullDate.substring(0, 4);
            let album = "";
            //validate collection name
            if (res.collectionName == "" || res.collectionName == null) {
                album = this.state.mediaType;
            } else {
                album = res.collectionName;
            }


            //create card with state data to display results
            return (
                <div>
				<Card style={{ width: '18rem' , margin : '20px' }}>
				  <Card.Img variant="top" src={res.artworkUrl100} />
				  <Card.Body>
				    <Card.Title>{res.trackName}</Card.Title>
				    <Card.Text>
					    {res.artistName}
				    </Card.Text>
				  </Card.Body>
				  <ListGroup className="list-group-flush">
				    <ListGroupItem>{album}</ListGroupItem>
				    <ListGroupItem>{year}</ListGroupItem>
				    <ListGroupItem>{res.primaryGenreName}</ListGroupItem>
				  </ListGroup>
				  <Card.Body>
				    <Button variant="primary" onClick = {this.add.bind(this)} value = {res.trackId}> Add to favourites</Button>
				  </Card.Body>
				</Card>
			</div>
            )
        })
    }

    // create a back button
    backToSearch() {
        return (
            <div className = "backToSearchBtn">
				<button onClick = {this.goToSearch.bind(this)} >Back to Search</button>
			</div>
        )
    }

    add(event) {
        //get event value
        let songToAdd = event.target.value;
        let results = this.state.SearchResults;
        let myFavs = this.state.favourites;

        //find event value in array - if found then add to favourites array in state
        results.find(res => {
            if (res.trackId == songToAdd) {
                myFavs.push(res);
                alert('Added to favourites !');
            }

        });
        this.setState({ favourites: myFavs });

    }

    remove(event) {
        //get event value
        let songToRemove = event.target.value;

        let myFavs = this.state.favourites;
        //loop through favourites - if event value is found in array it is removed
        for (let i = 0; i < myFavs.length; i++) {
            if (myFavs[i].trackId == songToRemove) {
                myFavs.splice(i, 1);
                alert('Removed!');
            }
        }
        this.setState({ favourites: myFavs });
    }

    goToFavourites() {
        //onClick checks to see if there a are favourites set in the array and displays the relevant component
        let Favs = this.state.favourites;

        if (Favs.length > 0) {
            this.setState({ showFav: true });
        } else {
            this.setState({ noFavs: true });
        }
    }

    goToSearch() {
        this.setState({ showFav: false, noFavs: false });
    }


    myFavourites() {
        //iterates state value favourites as cards
        return this.state.favourites.map((res, index) => {
            let fullDate = res.releaseDate;
            let year = fullDate.substring(0, 4);
            let album = "";
            //validate collection name
            if (res.collectionName == "" || res.collectionName == null) {
                album = this.state.mediaType;
            } else {
                album = res.collectionName;
            }
            return (
                <div>
				<Card style={{ width: '18rem' , margin : '20px' }}>
				  <Card.Img variant="top" src={res.artworkUrl100} />
				  <Card.Body>
				    <Card.Title>{res.trackName}</Card.Title>
				    <Card.Text>
					    {res.artistName}
				    </Card.Text>
				  </Card.Body>
				  <ListGroup className="list-group-flush">
				    <ListGroupItem>{album}</ListGroupItem>
				    <ListGroupItem>{year}</ListGroupItem>
				    <ListGroupItem>{res.primaryGenreName}</ListGroupItem>
				  </ListGroup>
				  <Card.Body>
				    <Button variant="primary" onClick = {this.remove.bind(this)} value = {res.trackId}> remove from favourites</Button>
				  </Card.Body>
				</Card>
			</div>
            )
        })
    }

    //renders a 'none found ' message
    noFavsFound() {

        return (
            <div className = "NoFavs">
				<h1>No favourites found</h1>
			</div>
        );

    }



    searchComponent() {
        //renders an input field , picklist and search button for user input
        return (
            <div className = "SearchComp">     
           		<div>
                     <button onClick = {this.goToFavourites.bind(this)} className = "FavsTopRight">My Favourites</button>  							
				</div>          	

				<div className = "SearchInputs">
	            	<input type="text" value={this.state.keyword} onChange={this.handleKeyword.bind(this)} placeholder = "Search..." className = "searchField"/> 
	            	<select value={this.state.mediaType} onChange={this.handleMedia.bind(this)} className = "searchType">
				        <option name="all">all</option> 
				        <option name="movie"> movie</option>
				        <option name="podcast">podcast</option>
				        <option name="music"> music</option>
				        <option name="musicVideo">musicVideo</option>
				        <option name="audiobook"> audiobook</option>
				        <option name="shortFilm">shortFilm</option>
				        <option name="tvShow"> tvShow</option>
				        <option name="software">software</option>
				        <option name="ebook"> ebook</option>
				    </select>
				    
					<button onClick = {this.search.bind(this)} className = "searchButton">Search</button>
	 			</div>
			</div>
        )
    }


    render() {
        //if state variable showFav == true - renders the favourites component
        if (this.state.showFav == true) {
            return (
                <div>
    				<div>
    					{this.backToSearch()}
    				</div>
    				<CardGroup>
		    			{this.myFavourites()}
		    		</CardGroup>
	    		</div>
            );
        }

        //if state variable noFavs == true - renders the none found component
        else if (this.state.noFavs == true) {
            return (
                <div>
    				<div>
    					{this.backToSearch()}
    				</div>
    				<CardGroup>
		    			{this.noFavsFound()}
		    		</CardGroup>
	    		</div>
            );
        }

        // renders the search results component
        else if (this.state.resultSet == true && this.state.showFav == false) {
            return (
                <div>
	            	<div>
	    				{this.searchComponent()}
	    			</div>
	    			<div>
		    			<CardGroup>
		    				{this.resultsCards()}
		    			</CardGroup>
	    			</div>
	    		</div>
            );
        }

        //renders the search component
        else if (this.state.resultSet == false) {
            return (
                <div>
            		<div>
    					{this.searchComponent()}
    				</div>
    				<div className= "Filler">
    					<h1>iTunes</h1>
    					<p>Search and add your favourite tunes to your very own favourites playlist !</p>
    				</div>	
    			</div>

            );
        }

    }
}

export default SearchPage;