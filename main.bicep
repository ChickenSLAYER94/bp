@description('Name of the web application')
param webAppName string = 'bp-calc-personal-acc'

@description('Location for all resources')
param location string = resourceGroup().location

@description('The SKU of App Service Plan (F1 = Free, B1 = Basic, S1 = Standard, P1v3 = Premium v3)')
param sku string = 'S1'

@description('.NET version')
param dotnetVersion string = '9.0'

@description('App Service Plan name')
var appServicePlanName = 'ASP-${webAppName}'

var stagingSlotName = 'staging'
var stagingSlotHostName = '${webAppName}-${stagingSlotName}.azurewebsites.net'

// Create App Service Plan for Linux
resource appServicePlan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: appServicePlanName
  location: location
  sku: {
    name: sku
    tier: sku == 'F1' ? 'Free' : (sku == 'B1' ? 'Basic' : 'Standard')
  }
  kind: 'linux'
  properties: {
    reserved: true // true for Linux, false for Windows
  }
}

// Create Web App on Linux (production slot)
resource webApp 'Microsoft.Web/sites@2023-12-01' = {
  name: webAppName
  location: location
  kind: 'app,linux'
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: 'DOTNETCORE|${dotnetVersion}'
      appSettings: [
        {
          name: 'WEBSITE_RUN_FROM_PACKAGE'
          value: '1'
        }
      ]
      experiments: {
        rampUpRules: [
          {
            // Route 10% of traffic to staging slot
            name: stagingSlotName
            actionHostName: stagingSlotHostName
            reroutePercentage: 10
            minReroutePercentage: 10
            maxReroutePercentage: 10
            changeStep: 0
            changeIntervalInMinutes: 0
          }
        ]
      }
    }
  }
}

// Staging deployment slot
resource stagingSlot 'Microsoft.Web/sites/slots@2023-12-01' = {
  name: stagingSlotName
  parent: webApp
  location: location
  kind: 'app,linux'
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: 'DOTNETCORE|${dotnetVersion}'
      appSettings: [
        {
          name: 'WEBSITE_RUN_FROM_PACKAGE'
          value: '1'
        }
      ]
    }
  }
}

// Outputs
output webAppUrl string = 'https://${webApp.properties.defaultHostName}'
output webAppNameOut string = webApp.name
output appServicePlanName string = appServicePlan.name
output stagingSlotUrl string = 'https://${webApp.name}-${stagingSlotName}.defaultHostName'



// # Create the resource group
// az group create \
//   --name Lab1-VStudio \
//   --location francecentral

// # Then deploy the template
// az deployment group create \
//   --resource-group Lab1-VStudio \
//   --template-file main.bicep
