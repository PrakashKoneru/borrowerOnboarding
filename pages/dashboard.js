import React, { useEffect } from 'react';
import { ThemeContext } from './_app';
import { Box, Input, Flex, Container, Select } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from "js-cookie";

const Dashboard = () => {

	useEffect(async () => {
		const { data: { loans } } = await axios.get('http://localhost:5000/dashboard', 
			{
				headers: {
					pToken: Cookies.get('pToken')
				}
			}
		)

		console.log(loans);
	}, [])
	return (
		<ThemeContext.Consumer>
			{(theme) => {
				return (
					<Container
						padding={{
							md: "0px 50px",
							sm: "0px 30px"
						}}
						mt="50px"
					>
						Coming Up
					</Container>
				)
			}}
		</ThemeContext.Consumer>
	)
}

export default Dashboard;