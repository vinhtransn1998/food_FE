import React, { Component } from "react";
import FoodDataService from "../services/food-service";
import { Link } from "react-router-dom";
import '../css/home.css';

export default class NewFood extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveFoods = this.retrieveFoods.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveFoods = this.setActiveFoods.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            foods: [],
            searchTitle: "",
            upload: ""
        };
    }

    componentDidMount() {
        this.retrieveFoods();
    }

    //target ký tự tìm kiếm
    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
        console.log(searchTitle);
    }
    //đổ dữ liệu từ data về
    retrieveFoods() {
        FoodDataService.getAll()
            .then(response => {
                this.setState({
                    foods: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveFoods();
        this.setState({
            currentFoods: null,
            currentIndex: -1
        });
    }

    setActiveFoods(food, index) {
        this.setState({
            currentFoods: food,
            currentIndex: index
        });
    }

    searchTitle() {
        FoodDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    foods: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchTitle, foods} = this.state;
        console.log(foods);
        

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        <div className="input-group search__button">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by title"
                                value={searchTitle}
                                onChange={this.onChangeSearchTitle}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={this.searchTitle}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <h1>News Food   </h1>
                <div className="row">
                    {foods &&
                        foods.map((food, index) => (
                            <div
                                className="col-3" key={index}
                            >
                                <div className="card" style={{ width: '18rem' }}>
                                    <img src={food.avatar} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{food.title}</h5>
                                        <p className="card-text">{food.description}</p>
                                        <a href="#" className="btn btn-primary">Xem thêm</a>
                                    </div>
                                </div>

                            </div>
                        ))}
                </div>
            </div>
        );
    }
}