import React from 'react';
import { ThemeContext } from '../_app';
import { Box, Input, Checkbox, Flex } from '@chakra-ui/react';

const SignUpForm = ({ register, errors }) => {
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
							Sign Up!
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
										Email
									</Box>
									<Input
										mt="5px"
										placeholder="Email"
										{...register("email", { 
											required: true
										})}
									/>
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
										Password
									</Box>
									<Input
										mt="5px"
										placeholder="Password"
										type="password"
										{...register("password", {
											required: true
										})}
									/>
									<Box>
									<Box mt="15px">
										<Checkbox
											name="checked"
											borderColor="#495FBF"
											size="lg"
											outlineColor="none"
										></Checkbox>
										<label style={{marginLeft: '10px', fontSize:'14px'}}> I agree to receive future communications from Paisa. </label>
									</Box>
									</Box>
								</Box>
							</Flex>
						</Box>
					</Box>
				)
			}}
		</ThemeContext.Consumer>
	);
}

export default SignUpForm;