import React, { useState, useEffect } from 'react';
import userDataService from '../services/userService.js';
import { Link } from 'react-router-dom';

const UsersList = () => {
	const [ users, setUsers ] = useState([]);
	const [ currentUser, setCurrentUser ] = useState(null);
	const [ currentIndex, setCurrentIndex ] = useState(-1);
	const [ searchTitle, setSearchTitle ] = useState('');

	useEffect(() => {
		retrieveUsers();
	}, []);

	const onChangeSearchTitle = (e) => {
		const searchTitle = e.target.value;
		setSearchTitle(searchTitle);
	};

	const retrieveUsers = () => {
		userDataService
			.getAllUser()
			.then((response) => {
				setUsers(response.data);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const refreshList = () => {
		retrieveUsers();
		setCurrentUser(null);
		setCurrentIndex(-1);
	};

	const setActiveUser = (user, index) => {
		setCurrentUser(user);
		setCurrentIndex(index);
	};
	const findByTitle = () => {
		console.log('Will Implement later on');
	};
	const removeAllUsers = () => {
		console.log('Api is not available');
		refreshList();
		alert("Remove all is not available yet. You can't remove yet");
	};

	return (
		<div className="list row">
			<div className="col-md-8">
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Search by title"
						value={searchTitle}
						onChange={onChangeSearchTitle}
					/>
					<div className="input-group-append">
						<button className="btn btn-outline-secondary" type="button" onClick={findByTitle}>
							Search
						</button>
					</div>
				</div>
			</div>
			<div className="col-md-6">
				<h4> Users List </h4>
				<ul className="list-group">
					
					{users &&
						users.map((user, index) => (
							<li
								className={'list-group-item ' + (index === currentIndex ? 'active' : '')}
								onClick={() => setActiveUser(user, index)}
								key={index}
							>
								<b> {user.first_name} </b> {user.last_name}
							</li>
						))}
				</ul>
				<button className="m-3 btn btn-sm btn-danger" onClick={removeAllUsers}>
					Remove All
				</button>
			</div>
			<div className="col-md-6">
				
				{currentUser ? (
					<div>
						<h4> User </h4>
						<div>
							<label>
								<strong> FirstName: </strong>
							</label>
							  {currentUser.first_name}
						</div>
						<div>
							<label>
								<strong> Last Name: </strong>
							</label>
							  {currentUser.last_name ? currentUser.last_name : '------'}
						</div>
						<div>
							<label>
								<strong> Email Id: </strong>
							</label>
							  {currentUser.email ? currentUser.email : 'N/A'}
						</div>
						<div>
							<label>
								<strong> Phone: </strong>
							</label>
							  {currentUser.phone ? currentUser.phone : 'N/A'}
						</div>
						<div>
							<label>
								<strong> Status: </strong>
							</label>
							  {currentUser.is_email_verified ? 'Verified' : 'Unverified'}
						</div>
						<Link to={'/users/' + currentUser._id} className="badge badge-warning">
							Edit
						</Link>
					</div>
				) : (
					<div>
						<br />
						<p> Click on particular user to see the details of ... </p>
					</div>
				)}
			</div>
		</div>
	);
};

export default UsersList;
