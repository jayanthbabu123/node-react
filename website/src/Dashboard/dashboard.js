import React, { Component } from 'react';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            content: [],
            requestError: false
        }

    }

    componentDidMount() {
        this.getUserDetails()
    }

    handleRemove = (value) => () => {
        (async () => {
            const rawResponse = await fetch(`http://localhost:8000/v1/user/delete/${value.user_name}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const content = await rawResponse.json();
            this.getUserDetails();
        })();
    }
    getUserDetails = () => {
        fetch('http://localhost:8000/v1/user')
            .then(response => {
                if (!response.ok) {
                    throw Error('Network request failed.')
                }
                return response;
            })
            .then(data => data.json())
            .then(data => {
                this.setState({
                    content: data
                });
            }, (ex) => {
                this.setState({
                    requestError: true
                });
            })
    }
    handleSearch = (event) => {
        if (event.target.value.length) {
            fetch(`http://localhost:8000/v1/user/search?q=${event.target.value}`)
                .then(response => {
                    if (!response.ok) {
                        throw Error('Network request failed.')
                    }
                    return response;
                })
                .then(data => data.json())
                .then(data => {
                    this.setState({
                        content: data
                    });
                }, (ex) => {
                    this.setState({
                        requestError: true
                    });
                })
        } else {
            this.getUserDetails();
        }

    }
    handleLogout=()=>{
        localStorage.removeItem('token')
    }
    render() {
        const rowData = this.state.content.map((value, index) => {
            return (
                <tr key={index}>
                    <td className="pt-3-half" >{value.first_name} </td>
                    <td className="pt-3-half" >{value.last_name}</td>
                    <td className="pt-3-half" >{value.user_name}</td>
                    <td>
                        <span className="table-remove">
                            <button onClick={this.handleRemove(value)} type="button" className="btn btn-danger btn-rounded btn-sm my-0">Remove</button>
                        </span>
                    </td>
                </tr>
            )
        })
        return (
            <>
                <div className="container-fluid">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <a class="navbar-brand" href="#">User Management</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                            aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">

                            </ul>
                            <form class="form-inline my-2 my-lg-0">
                                <button class="btn btn-outline-success my-2 my-sm-0" onClick={this.handleLogout}>Logout</button>
                            </form>
                        </div>
                    </nav>

                </div>
                <div className="container">
                    <div className="row main">
                        <div className="col-md-12">
                            <div className="card">
                                <h3 className="card-header text-center font-weight-bold text-uppercase py-4">User Data</h3>
                                <div className="card-body">
                                    <div id="table" className="table-editable">
                                        <input className="form-control" type="text" onChange={this.handleSearch} placeholder="Search Name" />
                                        <table className="table table-bordered table-responsive-md table-striped text-center">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">Username</th>
                                                    <th className="text-center">First Name</th>
                                                    <th className="text-center">Last Name</th>
                                                    <th className="text-center">Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rowData}
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>


        )
    }

}