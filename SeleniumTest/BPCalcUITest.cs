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
        private TestContext testContextInstance;


        public TestContext TestContext
        {
            get { return testContextInstance; }
            set { testContextInstance = value; }
        }

        private String azureWebAppUrl;

        [TestInitialize]
        public void TestInitialize()
        {
            // Get the Azure Web App URL from the test context
            this.azureWebAppUrl = testContextInstance.Properties["azureWebAppUrl"]?.ToString();
            // this.azureWebAppUrl = "https://bp-calc.azurewebsites.net/";
        }

        [TestMethod]
        public void TestBPCalcUI()
        {
            String chromeDriverPath = Environment.GetEnvironmentVariable("ChromeWebDriver");
            if (string.IsNullOrEmpty(chromeDriverPath))
            {
               chromeDriverPath = "."; // Default to current directory if not set for local testing
            }
            using (IWebDriver driver = new ChromeDriver(chromeDriverPath))
            {
                driver.Navigate().GoToUrl(azureWebAppUrl);
                // Find input fields and button
                var systolicInput = driver.FindElement(By.Id("BP_Systolic"));
                var diastolicInput = driver.FindElement(By.Id("BP_Diastolic"));
                // Input test values
                systolicInput.SendKeys("120");
                diastolicInput.SendKeys("80");
                // submit form
                driver.FindElement(By.Id("form1")).Submit();

                // Wait for the result to be displayed - this is important
                WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
                wait.Until(d => d.FindElement(By.Id("Bp-Calc-Output")).Displayed);
                // Get the result text
                var outputTest = driver.FindElement(By.Id("Bp-Calc-Output")).Text;
                // Assert the expected result
                Assert.AreEqual("Ideal", outputTest);
            }
        }
    }
}
