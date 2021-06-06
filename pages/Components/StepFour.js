import React from 'react';
import { ThemeContext } from '../_app';
import { Box, Input, Select, Flex } from '@chakra-ui/react';

const StepFour = ({ fieldValues, register, errors }) => {
	return (
		<ThemeContext.Consumer>
			{(theme) => {
				return (
					<Box
						w="100%"
					>
						<Box
							fontSize="35px"
						>
							Debt Details
						</Box>
						<Box
							mt="20px"
						>
							{/* Row 1 */}
							<Flex
								mt="20px"
								flexDirection={{ sm: "column", md: "row" }}
								alignItems="flex-end"
							>
								<Box
									w="100%"
									mt={{sm: "15px", md: "0px" }}
								>
									<Box
										fontWeight="500"
									>
										Total outstanding credit cards balance
									</Box>
									<Input
										type="number"
										mt="5px"
										placeholder=">0"
										{...register("outstanding_credit_balance", {
											required: true
										})}
									/>
									{errors.loan_amount && (
										<Box color={theme.colors.red}>
										 Please enter a valid Dollar Amount.
										</Box>
									)}
								</Box>
							</Flex>
							{/* Row 2 */}
							<Flex
								mt="20px"
								flexDirection={{ sm: "column", md: "row" }}
								alignItems="flex-end"
							>
								<Box
									w="100%"
									mt={{sm: "15px", md: "0px" }}
								>
									<Box
										fontWeight="500"
									>
										Total outstanding loans excluding credit cards (including mortgage, auto, personal loans, etc.)
									</Box>
									<Input
										type="number"
										mt="5px"
										placeholder=">0"
										{...register("outstanding_other_loan_balance", {
											required: true
										})}
									/>
									{errors.outstanding_other_loan_balance && (
										<Box color={theme.colors.red}>
										 Please enter a valid Dollar Amount.
										</Box>
									)}
								</Box>
							</Flex>
							{/* Row 3 */}
							<Flex
								mt="20px"
								flexDirection={{ sm: "column", md: "row" }}
								alignItems="flex-end"
							>
								<Box
									w="100%"
									mt={{sm: "15px", md: "0px" }}
								>
									<Box
										fontWeight="500"
									>
										How much do you have in savings?
									</Box>
									<Input
										type="number"
										mt="5px"
										placeholder=">0"
										{...register("savings", {
											required: true
										})}
									/>
									{errors.savings && (
										<Box color={theme.colors.red}>
										 Please enter a valid Dollar Amount.
										</Box>
									)}
								</Box>
							</Flex>
						</Box>
					</Box>
				)
			}}
		</ThemeContext.Consumer>
	);
}

export default StepFour;