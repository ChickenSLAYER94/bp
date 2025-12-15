using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;

namespace SeleniumTest
{
    [TestClass]
    public class BPCalcUITest
    {
        //this is to get URL 
        public TestContext TestContext { get; set; }
        private string azureWebAppUrl;

        [TestInitialize]
        public void TestInitialize()
        {
            // Get the Azure Web App URL from the test context
            this.azureWebAppUrl = "https://bp-calc-personal-acc-staging.azurewebsites.net/";
        }
        // Centralized ChromeDriver creation for all tests
        private static IWebDriver CreateDriver()
        {
            var options = new ChromeOptions();

            // Headless-friendly options for CI
            options.AddArgument("--headless=new");
            options.AddArgument("--no-sandbox");
            options.AddArgument("--disable-dev-shm-usage");
            options.AddArgument("--disable-gpu");
            options.AddArgument("--window-size=1920,1080");

            return new ChromeDriver(options);
        }

        public void TestBPCalcUI(string systolic, string diastolic, string expected)
        {   
            //using (IWebDriver driver = new ChromeDriver()) //for testing in local env
            using (IWebDriver driver = CreateDriver()) //for Github Actions
            {
                driver.Navigate().GoToUrl(azureWebAppUrl);

                var systolicInput = driver.FindElement(By.Id("BP_Systolic"));
                var diastolicInput = driver.FindElement(By.Id("BP_Diastolic"));

                systolicInput.Clear();
                diastolicInput.Clear();

                systolicInput.SendKeys(systolic);
                diastolicInput.SendKeys(diastolic);

                driver.FindElement(By.Id("form1")).Submit();

                WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
                wait.Until(d => d.FindElement(By.Id("Bp-Calc-Output")).Displayed);

                var outputTest = driver.FindElement(By.Id("Bp-Calc-Output")).Text;

                Assert.AreEqual(expected, outputTest);
            }
        }
        [TestMethod]
        public void TestIdealBloodPressure()
            => TestBPCalcUI("120", "80", "Ideal Blood Pressure");

        [TestMethod]
        public void TestHighBloodPressure()
            => TestBPCalcUI("150", "95", "High Blood Pressure");

        [TestMethod]
        public void TestLowBloodPressure()
            => TestBPCalcUI("85", "55", "Low Blood Pressure");

        [TestMethod]
        public void TestPreHighBloodPressure()
            => TestBPCalcUI("125", "78", "Pre-High Blood Pressure");

    }
}
