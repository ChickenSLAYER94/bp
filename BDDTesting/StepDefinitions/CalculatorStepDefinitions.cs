using BPCalculator;

namespace BDDTesting.StepDefinitions
{
    [Binding]
    public sealed class CalculatorStepDefinitions
    {
        
        private string _result = "";
        BloodPressure bp = new BloodPressure();

        [Given("the systolic pressure is {int}")]
        public void systolic_value(int _sys)
        {
            bp.Systolic = _sys;
        }

        [Given("the diastolic pressure is {int}")]
        public void diastolic_value(int _dias)
        {
            bp.Diastolic = _dias;
        }

        [When("the blood pressure category is determined")]
        public void check_bp_catogery()
        {
            _result = bp.Category.ToString();
        }

        [Then("the category should be {string}")]
        public void ThenTheResultShouldBe(string result)
        {
            Assert.AreEqual(result, _result);
        }
    }
}
