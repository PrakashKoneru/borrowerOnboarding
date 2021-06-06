import React from 'react';
import { ThemeContext } from '../_app';
import { Box, Input, Select, Flex } from '@chakra-ui/react';

const StepOne = ({ register, errors }) => {
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
							Loan Details
						</Box>
						<Box
							mt="20px"
						>
							<Flex
								alignItems="center"
								justifyContent="center"
								flexWrap="wrap"
								flexDirection="column"
							>
								<Box
									w="100%"
								>
									<Box
										fontWeight="500"
									>
										How much would you like to borrow?
									</Box>
									<Input
										type="number"
										mt="5px"
										placeholder="Loan Amount ($)"
										{...register("loan_amount", { 
											required: true,
											validate: value => value >= 1000 && value <= 5000
										})}
									/>
									<Box
										mt="5px"
										color={theme.colors.gray}
									>
										$1000 - $5000
									</Box>
									{errors.loan_amount && (
										<Box color={theme.colors.red}>
										 Please enter a valid Loan Amount.
										</Box>
									)}
								</Box>
								<Box
									w="100%"
									mt="25px"
								>
									<Box
										fontWeight="500"
									>
										What’s your loan purpose?
									</Box>
									<Select
										mt="5px"
										{...register("loan_purpose", { required: true })}
									>
										<option value="option1">Option 1</option>
										<option value="option2">Option 2</option>
										<option value="option3">Option 3</option>
										<option value="option4">Option 4</option>
									</Select>
								</Box>
							</Flex>
						</Box>
					</Box>
				)
			}}
		</ThemeContext.Consumer>
	);
}

export default StepOne;

// return (
// 	<ThemeContext.Consumer>
// 		{() => {
// 			return (
// 				<Box></Box>
// 			)
// 		}}
// 	</ThemeContext.Consumer>
// );