import React, { useState } from 'react';
import { ThemeContext } from '../_app';
import { Box, Input, Select, Option, Flex } from '@chakra-ui/react';

const StepThree = ({ fieldValues, register, errors }) => {
	console.log(fieldValues, errors);
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
							Income Details
						</Box>
						<Box
							mt="20px"
						>
							{/* Row 1 */}
							<Flex
								mt="20px"
								flexDirection={{ sm: "column" }}
								alignItems="flex-end"
							>
								<Box
									w={{ sm: "100%" }}
								>
									<Box
										fontWeight="500"
									>
										What’s your primary source of income?
									</Box>
									<Select
										mt="5px"
										{...register("income_primary_source", {
											required: true
										})}
									>
										<option value="">Please Select</option>
										<option value="Job">Job</option>
										<option value="Self Employed">Self Employed</option>
										<option value="Other">Other</option>
									</Select>
									{errors.income_primary_source && (
										<Box color={theme.colors.red}>
										 Please select an option.
										</Box>
									)}
								</Box>
								{fieldValues.income_primary_source === 'Job' && (
									<Box w="100%" mt="20px">
										<Box
											fontWeight="500"
										>
											Type of employment
										</Box>
										<Select
											mt="5px"
											{...register("employment_type", {
												required: true
											})}
										>
											<option value="Full Time">Full Time</option>
											<option value="Contract">Contract</option>
											<option value="Part Time">Part Time</option>
										</Select>
									</Box>
								)}
							</Flex>
							{/* Row 2 */}
							<Flex
								mt="20px"
								flexDirection={{ sm: "column", md: "row" }}
								alignItems="flex-end"
							>
								<Box
									w={{ sm: "100%" }}
								>
									<Box
										fontWeight="500"
									>
										Total primary annual income?
									</Box>
									<Input
										type="number"
										mt="5px"
										placeholder="Primary Annual Income"
										{...register("primary_annual_income", {
											required: true,
											validate: value => value > 0
										})}
									/>
									<Box
										mt="5px"
										color={theme.colors.gray}
									>
										{`> $0`}
									</Box>
									{errors.primary_annual_income && (
										<Box color={theme.colors.red}>
										 Please enter a valid amount.
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
									w={{ sm: "100%" }}
								>
									<Box
										fontWeight="500"
									>
										Any other source of income?
									</Box>
									<Select
											mt="5px"
											{...register("income_from_other_sources", {
												required: true
											})}
										>
											<option value="">Please Select</option>
											<option value="Yes">Yes</option>
											<option value="No">No</option>
										</Select>
								</Box>
							</Flex>
							{fieldValues.income_from_other_sources === 'Yes' && (
								<Box w="100%" mt="20px">
									<Box
										fontWeight="500"
									>
										Total annual income from other sources
									</Box>
									<Input
										type="number"
										mt="5px"
										placeholder="Income from other sources"
										{...register("secondary_annual_income", {
											required: true,
											validate: value => value > 0
										})}
									/>
									<Box
										mt="5px"
										color={theme.colors.gray}
									>
										{`> $0`}
									</Box>
									{errors.secondary_annual_income && (
										<Box color={theme.colors.red}>
										 Please enter a valid amount.
										</Box>
									)}
								</Box>
							)}
						</Box>
					</Box>
				)
			}}
		</ThemeContext.Consumer>
	);
}

export default StepThree;