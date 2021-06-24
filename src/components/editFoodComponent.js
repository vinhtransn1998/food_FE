import React, { Component } from "react";
import FoodDataService from "../services/food-service";

export default class EditFood extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getFood = this.getFood.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateFood = this.updateFood.bind(this);
    this.deleteFood = this.deleteFood.bind(this);

    this.state = {
      currentFood: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getFood(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentFood: {
          ...prevState.currentFood,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentFood: {
        ...prevState.currentFood,
        description: description
      }
    }));
  }

  getFood(id) {
    FoodDataService.get(id)
      .then(response => {
        this.setState({
          currentFood: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentFood.id,
      title: this.state.currentFood.title,
      description: this.state.currentFood.description,
      published: status
    };

    FoodDataService.update(this.state.currentFood.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentFood: {
            ...prevState.currentFood,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateFood() {
    FoodDataService.update(
      this.state.currentFood.id,
      this.state.currentFood
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The food was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteFood() {    
    FoodDataService.delete(this.state.currentFood.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/foods')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentFood } = this.state;

    return (
      <div>
        {currentFood ? (
          <div className="edit-form">
            <h4>Edit status</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentFood.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentFood.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentFood.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentFood.published ? (
              <button
                className="btn btn-outline-success"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="btn btn-outline-primary"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="btn btn-outline-danger"
              onClick={this.deleteFood}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-outline-success"
              onClick={this.updateFood}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Food...</p>
          </div>
        )}
      </div>
    );
  }
}