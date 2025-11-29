Feature: Calculator
	Calculate blood pressure

# scenario 1
@mytag
Scenario: Identify Blood Pressure Category is High
	Given the systolic pressure is 150
	And the diastolic pressure is 95
	When the blood pressure category is determined
	Then the category should be "High"

# scenario 2
Scenario: Identify Blood Pressure Category is Low
	Given the systolic pressure is 85
	And the diastolic pressure is 55
	When the blood pressure category is determined
	Then the category should be "Low"

	# scenario 3
Scenario: Identify Blood Pressure Category is Ideal
	Given the systolic pressure is 120
	And the diastolic pressure is 80
	When the blood pressure category is determined
	Then the category should be "Ideal"

	# scenario 4
Scenario: Identify Blood Pressure Category is PreHigh
	Given the systolic pressure is 130
	And the diastolic pressure is 85
	When the blood pressure category is determined
	Then the category should be "PreHigh"