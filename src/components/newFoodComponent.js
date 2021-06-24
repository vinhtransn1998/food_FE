import React, { Component } from "react";
import FoodDataService from "../services/food-service";
import { Link } from "react-router-dom";

export default class NewFood extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveFoods = this.retrieveFoods.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveFoods = this.setActiveFoods.bind(this);
    this.removeAllFoods = this.removeAllFoods.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      foods: [],
      currentFoods: null,
      currentIndex: -1,
      searchTitle: "",
      upload:""
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

  removeAllFoods() {
    FoodDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
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
   const { searchTitle, foods, currentFoods, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
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
        <div className="col-md-6">
          <h4>Feature food</h4>

          <ul className="list-group">
            {foods &&
              foods.map((food, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFoods(food, index)}
                  key={index}
                >
                  {food.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllFoods}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentFoods ? (
            <div>
              <h4>food</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentFoods.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentFoods.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentFoods.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/foods/" + currentFoods.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Food...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}