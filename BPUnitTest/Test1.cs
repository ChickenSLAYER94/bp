using Microsoft.VisualStudio.TestTools.UnitTesting;
using BPCalculator;

namespace BPUnitTest
{
    [TestClass]
    public sealed class Test1
    {
        [TestMethod]
        public void TestMethod1()
        {
            BloodPressure bp = new BloodPressure();
            bp.Systolic = 150;
            bp.Diastolic = 95;
            Assert.AreEqual(BPCategory.High, bp.Category);
        }

        [TestMethod]
        public void TestMethod2()
        {
            BloodPressure bp = new BloodPressure();
            bp.Systolic = 100;
            bp.Diastolic = 90;
            Assert.AreEqual(BPCategory.High, bp.Category);
        }
        [TestMethod]
        public void TestMethod3()
        {
            BloodPressure bp = new BloodPressure();
            bp.Systolic = 115;
            bp.Diastolic = 75;
            Assert.AreEqual(BPCategory.Ideal, bp.Category);
        }
        [TestMethod]
        public void TestMethod4()
        {
            BloodPressure bp = new BloodPressure();
            bp.Systolic = 85;
            bp.Diastolic = 55;
            Assert.AreEqual(BPCategory.Low, bp.Category);
        }
        [TestMethod]
        public void TestMethod5()
        {
            BloodPressure bp = new BloodPressure();
            bp.Systolic = 125;
            bp.Diastolic = 78;
            Assert.AreEqual(BPCategory.PreHigh, bp.Category);
        }
        [TestMethod]
        public void TestMethod6()
        {
            BloodPressure bp = new BloodPressure();
            bp.Systolic = 119;
            bp.Diastolic = 79;
            Assert.IsTrue(bp.Category == BPCategory.Ideal || bp.Category == BPCategory.PreHigh);
        }
        [TestMethod]
        public void TestMethod7()
        {
            BloodPressure bp = new BloodPressure();
            bp.Systolic = 69;
            Assert.IsGreaterThanOrEqualTo(bp.Systolic, BloodPressure.SystolicMin);
        }
        [TestMethod]
        public void TestMethod8()
        {
            BloodPressure bp = new BloodPressure();
            bp.Diastolic = 100;
            Assert.IsLessThanOrEqualTo(bp.Diastolic, BloodPressure.DiastolicMax);
        }
    }
}
