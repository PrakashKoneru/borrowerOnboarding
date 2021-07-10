import React, { useEffect, useState } from 'react';
import { ThemeContext } from '../../_app';
import { Box, Flex, Container } from '@chakra-ui/react';
import moment from 'moment';

const PendingLoanStatus = ({ loan }) => {
	if(!loan) return null;
	var moment_loan_issue_date = moment(loan.loan_issue_date, 'MMM-YY');

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
										Loan Status
									</Box>
									{/* {loans.last_pymnt_amnt} */}
									<Box
										mt="5px"
										color={theme.colors.mustard}
										fontSize="40px"
									>
										Pending
									</Box>
								</Box>
							</Flex>
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
									fontSize="20px"
									fontWeight="600"
								>
									Summary
								</Box>
								<Box
									mt="10px"
									maxWidth="90%"
									marginLeft="auto"
									marginRight="auto"
								>
									In {`${moment_loan_issue_date.format("MMMM, YYYY")}`} you requested for <Box as="span" fontWeight="600">${loan.loan_amnt}</Box> loan, and it is awaiting a decision.
								</Box>
							</Flex>
						</Flex>
					</Container>
				)	
			}}
		</ThemeContext.Consumer>
	)
}

export default PendingLoanStatus;