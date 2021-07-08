import React, { useEffect, useState } from 'react';
import { ThemeContext } from './_app';
import { Box, Input, Flex, Container, Select } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from "js-cookie";
import moment from 'moment';
import ApprovedLoanStatus from './components/loanStatusComponents/approvedLoanStatus';

const Dashboard = () => {
	const [loans, setLoans] = useState();
	useEffect(async () => {
		const { data } = await axios.get('http://localhost:5000/dashboard', 
			{
				headers: {
					pToken: Cookies.get('pToken')
				}
			}
		)
		setLoans(data.loans)
	}, [])
	
	if(!loans) return null;

	return (
		<ThemeContext.Consumer>
			{(theme) => {
				if(loans.approval_status === 'approved') return (<ApprovedLoanStatus loan={loans} />)
				// if(loans.approval_status === 'rejected') return <ApprovedLoanStatus loans={loan} />
				// if(loans.approval_status === 'pending') return <ApprovedLoanStatus loans={loan} />
				return null;
			}}
		</ThemeContext.Consumer>
	)
}

export default Dashboard;