import React, { useState } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import axios from 'axios';
import { ThemeContext } from './_app';
import One from './components/one';
import Two from './components/two';
import Three from './components/three';
import Four from './components/four';
import SignUpForm from './components/signUpForm';
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

function updateAction(state, payload) {
    return {
      ...state,
      data: {
        ...state.data,
        ...payload
      }
    };
  }


const onboarding = (props) => {
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const [currentStep, setCurrentStep] = useState(0);
	const [calculationId, setCalculationId] = useState(null);
	const { actions, state } = useStateMachine({ updateAction });
	const router = useRouter();


	const Steps = [One, Two, Three, Four]
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

	const postScoreData = (data) => {
		actions.updateAction(data);
		moveToNextStep();
		if(currentStep === Steps.length - 1) {
			axios.post('http://localhost:5000/scoreCalculator', data)
			.then(({ data }) => {
				console.log(data)
				setCalculationId(data.calculationId);
			});
		}
	}
	const postSignUpData = ({email, password}) => {
		axios.post('http://localhost:5000/authentication/signUp', { email, password, calculation_id: calculationId })
		.then(({ data: { pToken } }) => {
			Cookies.set('pToken', pToken);
			router.push('/dashboard');
		});
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
							{calculationId && (
								<form onSubmit={handleSubmit(postSignUpData)}>
									<SignUpForm 
										fieldValues={fieldValues}
										register={register}
										errors={errors}
									/>
									<Box
										display="flex"
										justifyContent="flex-end"
										mt="20px"
									>
										<Button
											type="submit"
										>
											Sign Up
										</Button>
									</Box>
								</form>
							)}
							{!calculationId && (
								<form onSubmit={handleSubmit(postScoreData)}>
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
										>
											Next
										</Button>
									</Box>
								</form>
							)}
						</Box>
					</Flex>
				)
			}}
		</ThemeContext.Consumer>
	);
}

export default onboarding;