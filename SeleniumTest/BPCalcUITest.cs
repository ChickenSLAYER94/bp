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

        private string azureWebAppUrl;

        [TestInitialize]
        public void TestInitialize()
        {
            // Get the Azure Web App URL from the test context
            // this.azureWebAppUrl = testContextInstance.Properties["azureWebAppUrl"]?.ToString();
            this.azureWebAppUrl = "https://bp-calc.azurewebsites.net/";
        }

        [TestMethod]
        public void TestBPCalcUI()
         {
            var options = new ChromeOptions();

            // Required for GitHub Actions (headless Linux environment)
            options.AddArgument("--headless=new");
            options.AddArgument("--no-sandbox");
            options.AddArgument("--disable-dev-shm-usage");
            options.AddArgument("--disable-gpu");
            options.AddArgument("--window-size=1920,1080");

            // Let Selenium auto-manage ChromeDriver (best practice in 2024+)
            using (IWebDriver driver = new ChromeDriver(options))
            {
                driver.Navigate().GoToUrl(azureWebAppUrl);

                var systolicInput = driver.FindElement(By.Id("BP_Systolic"));
                var diastolicInput = driver.FindElement(By.Id("BP_Diastolic"));

                systolicInput.SendKeys("120");
                diastolicInput.SendKeys("80");

                driver.FindElement(By.Id("form1")).Submit();

                WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
                wait.Until(d => d.FindElement(By.Id("Bp-Calc-Output")).Displayed);

                var outputTest = driver.FindElement(By.Id("Bp-Calc-Output")).Text;

                Assert.AreEqual("Ideal", outputTest);
            }
        }
    }
}
