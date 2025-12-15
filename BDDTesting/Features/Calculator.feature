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

	# scenario 5
Scenario: Identify Blood Pressure Category is Normal
	Given the systolic pressure is 115
	And the diastolic pressure is 75
	When the blood pressure category is determined
	Then the category should be "Ideal"

	# scenario 6
Scenario: Identify Blood Pressure Category is Hypertensive Crisis
	Given the systolic pressure is 190
	And the diastolic pressure is 120
	When the blood pressure category is determined
	Then the category should be "High"

	