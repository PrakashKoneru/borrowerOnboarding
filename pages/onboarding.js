import React, { useState } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import axios from 'axios';
import { ThemeContext } from './_app';
import StepOne from './Components/StepOne';
import StepTwo from './Components/StepTwo';
import StepThree from './Components/StepThree';
import StepFour from './Components/StepFour';
import StepFive from './Components/StepFive';
import { useForm } from "react-hook-form";
import updateAction from "./store/updateAction";
import { useStateMachine } from "little-state-machine";


const onboarding = (props) => {
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const [currentStep, setCurrentStep] = useState(0);
	const { actions, state } = useStateMachine({ updateAction });

	const Steps = [StepOne, StepTwo, StepThree, StepFour]
	const CurrentComponent = Steps[currentStep];
	const fieldValues = watch();

	const moveToNextStep = () => {
		if(Object.keys(errors).length === 0) {
			if(currentStep < Steps.length - 1) setCurrentStep(currentStep + 1);
		}
	}

	const moveToPrevStep = () => {
		if(currentStep > 0) setCurrentStep(currentStep - 1);
	}

	const postData = (data) => {
		actions.updateAction(data);
		moveToNextStep();
		if(currentStep === Steps.length - 1) {
			console.log('only called on last step');
			axios.post('http://localhost:5000/scoreCalculator', data);
		}
	}

	// console.log(errors, 'errors');
	return (
		<ThemeContext.Consumer>
			{(theme) => {
				return (
					<Flex
						bg={theme.colors.bgBlue}
						h="100vh"
						w="100%"
						alignItems="center"
						justifyContent="center"
					>
						<Box
							id="box"
							bg="white"
							border={`0.3px solid ${theme.colors.secondary}`}
							borderRadius="3px"
							// width={{ sm: "100%", md: "50%"}}
							minWidth={{ sm: "auto", md: "600px"}}
							maxW="600px"
							minHeight={{ sm: "400px", md: "350px", lg: "400px" }}
							w={{ sm: "100%", md: "auto" }}
							py="10px"
							px="20px"
							mx="20px"
							my="15px"
							display="flex"
							flexDirection="column"
							justifyContent="center"
						>
							<form onSubmit={handleSubmit(postData)}>
								<CurrentComponent
									fieldValues={fieldValues}
									register={register}
									errors={errors}
								/>
								<Box
									display="flex"
									justifyContent="space-between"
									mt="20px"
								>
									<Box minWidth="20px">
										{currentStep > 0 && (
											<Button
												onClick={moveToPrevStep}
											>
												Prev
											</Button>
										)}
									</Box>
									<Button
										type="submit"
										// onClick={moveToNextStep}
									>
										Next
									</Button>
								</Box>
							</form>
						</Box>
					</Flex>
				)
			}}
		</ThemeContext.Consumer>
	);
}

export default onboarding;