import React, { Component } from "react";
import FoodDataService from "../services/food-service";

export default class AddFood extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveFood = this.saveFood.bind(this);
        this.newFood = this.newFood.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            published: false,
            submitted: false,
            avatar:""
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    saveFood(evt) {
        let {title, description, avatar} = this.state;
        evt.preventDefault();
        const formData = new FormData();
        formData.append("avatar",avatar);
        formData.append("title",title);
        formData.append("description",description);
        FoodDataService.create(formData)
            .then(response => {
                this.setState({
                    submitted: true
                });
            })
            .catch(e => {
                console.log(e);
            });
            
    }

    newFood() {
        this.setState({
            id: null,
            title: "",
            description: "",
            published: false,
            submitted: false,
            avatar:""
        });
    }

    onChangeUpload=(e)=> {
        this.setState({avatar:e.target.files[0]})
    }

    render() {

        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newFood}>
                            Add
            </button>
                    </div>
                ) : (
                    <div>
                        <form  action="/api/food" method="post" encType="multipart/form-data">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>

                        <div className="form-group">
                        <label htmlFor="title">Image Upload</label>
                            <input
                                type="file"
                                className="form-control"
                                required
                                onChange={this.onChangeUpload}
                                name="avatar"
                            />
                        </div>
                        
                        <button onClick={this.saveFood} className="btn btn-success">
                            Submit
                        </button>
                        </form>
                    </div>
                )}
            </div>
        )
    }
}