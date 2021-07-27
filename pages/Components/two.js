import React from 'react';
import { ThemeContext } from '../_app';
import { Box, Input, Select, Flex } from '@chakra-ui/react';

const Two = ({ register, errors }) => {
	if(!register) return null;
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
							Personal Profile
						</Box>
						<Box
							mt="20px"
						>
							{/* Row 1 */}
							<Flex
								mt="20px"
								flexDirection={{ sm: "column", md: "row" }}
							>
								<Box
									w={{ sm: "100%", md: "50%" }}
									mr={{ sm: "0px", md: "25px"}}
								>
									<Box
										fontWeight="500"
									>
										What’s your age?
									</Box>
									<Input
										type="number"
										mt="5px"
										placeholder="Age"
										{...register("age", { 
											required: true,
											validate: value => value >= 18 && value <= 100
										})}
									/>
									<Box
										mt="5px"
										color={theme.colors.gray}
									>
										18 years - 100 years
									</Box>
									{errors.age && (
										<Box color={theme.colors.red}>
										 Please enter a valid Age.
										</Box>
									)}
								</Box>
								<Box
									w={{ sm: "100%", md: "50%" }}
									mt={{sm: "15px", md: "0px" }}
								>
									<Box
										fontWeight="500"
									>
										What’s your current ZIP code?
									</Box>
									<Input
										mt="5px"
										placeholder="Zip Code"
										{...register("zip_code", { required: true })}
									/>
									<Box
										mt="5px"
										color={theme.colors.gray}
									>
										5 - 8 digit
									</Box>
									{errors.zip_code && (
										<Box color={theme.colors.red}>
										 Please enter a valid Zip Code.
										</Box>
									)}
								</Box>
							</Flex>
							{/* Row 2 */}
							<Flex
								mt="20px"
								flexDirection={{ sm: "column", md: "row" }}
							>
								<Box
									w={{ sm: "100%" }}
									mr={{ sm: "0px" }}
								>
									<Box
										fontWeight="500"
									>
										What’s your highest level of education?
									</Box>
									<Select
										mt="5px"
										{...register("highest_education_level", { required: true })}
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

export default Two;