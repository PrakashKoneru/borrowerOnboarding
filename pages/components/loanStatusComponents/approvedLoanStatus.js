import React, { useEffect, useState } from 'react';
import { ThemeContext } from '../../_app';
import { Box, Input, Flex, Container, Select } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from "js-cookie";
import moment from 'moment';

const ApprovedLoanStatus = ({ loan }) => {
	if(!loan) return null;
	var moment_loan_issue_date = moment(loan.loan_issue_date, 'MMM-YY');
	var moment_current_date = moment("Sep-20", 'MMM-YY');
	const amount_due = ((moment_current_date.diff(moment_loan_issue_date, "months")) * Number(loan.installment)) - (Number(loan.total_rec_principal) + Number(loan.total_rec_interest));

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
							<Flex
								w={{ md: "48%", sm: "100%" }}
								h="300px"
								border={`1px solid ${theme.colors.gray}`}
								borderRadius="3px"
								flexDirection="column"
								justifyContent="center"
								alignItems="center"
								px="15px"
							>
								<Box
									textAlign="center"
									w="100%"
								>
									<Box fontSize="18px" fontWeight="600">
										Balance this month
									</Box>
									{/* {loans.last_pymnt_amnt} */}
									<Box
										mt="5px"
										color={theme.colors.darkGreen}
										fontSize="40px"
									>
										${amount_due.toFixed(2)}
									</Box>
								</Box>
								<Box mt="15px">
									{/* {loans.last_pymnt_amnt} */}
									Last Payment of <Box as="span" fontWeight="600">${loan.last_pymnt_amnt}</Box> was successful.
								</Box>
								<Box mt="20px">
									<Box>
										Next Payment of ${(Number(loan.installment) + amount_due).toFixed(2)} is due on {loan.next_pymnt_date}
									</Box>
								</Box>
							</Flex>
							<Flex
								w={{ md: "48%", sm: "100%" }}
								h="300px"
								border={`1px solid ${theme.colors.gray}`}
								borderRadius="3px"
								flexDirection="column"
								px="15px"
							>
								<Box
									mt="15px"
									fontSize="20px"
									fontWeight="600"
								>
									Repayment Summary
								</Box>
								<Box mt="10px">
									In {`${moment_loan_issue_date.format("MMMM, YYYY")}`} you got a <Box as="span" fontWeight="600">${loan.loan_amnt}</Box> loan, see how far you've come!
								</Box>
								<Box mt="20px">
									<Box>You have paid a sum of ${loan.total_rec_principal} towards principal</Box>
									<Box
										mt="15px"
										bg={`${theme.colors.grayLight}`}
										h="15px"
										w="100%"
										borderRadius="25px"
									>
										<Box
											mt="15px"
											bg={`${theme.colors.darkGreen}`}
											h="15px"
											w={`${(loan.total_rec_principal/loan.loan_amnt) * 100}%`}
											borderRadius="25px"
										>
										</Box>
										<Box
											textAlign="right"
											mt="3px"
										>
											${loan.loan_amnt}
										</Box>
									</Box>
								</Box>
							</Flex>
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

export default ApprovedLoanStatus;