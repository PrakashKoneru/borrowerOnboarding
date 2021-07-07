import React, { useEffect, useState } from 'react';
import { ThemeContext } from './_app';
import { Box, Input, Flex, Container, Select } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from "js-cookie";

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
						<Flex
							flexWrap="wrap"
							justifyContent="space-between"
						>
							<Box
								w={{ md: "48%", sm: "100%" }}
								h="300px"
								border={`1px solid ${theme.colors.gray}`}
								borderRadius="3px"
							>
							</Box>
							<Box
								w={{ md: "48%", sm: "100%" }}
								h="300px"
								border={`1px solid ${theme.colors.gray}`}
								borderRadius="3px"
							>
							</Box>
						</Flex>
						<Box
							mt="30px"
							w="100%"
							h="300px"
							border={`1px solid ${theme.colors.gray}`}
							borderRadius="3px"
						>
						</Box>
					</Container>
				)
			}}
		</ThemeContext.Consumer>
	)
}

export default Dashboard;