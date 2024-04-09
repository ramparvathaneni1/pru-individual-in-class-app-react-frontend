const selenium = require("selenium-webdriver");

describe("Testing BucketList Application", () => {
  let driver = null;

  // Before All Tests, build driver and navigate to BucketList App
  beforeAll(async () => {
    driver = await new selenium.Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/");
  });

  // After All Tests, close the driver and browser
  afterAll(async () => {
    await driver.quit();
  });


  // Testing '/' route
  describe("Home route", () => {

    // Verify H1 text 
    test("should have page title as 'BucketList'", async () => {
      const h1Element = await driver.findElement(selenium.By.css("h1"));
      const actualText = await h1Element.getText();
      const expectedText = "BucketList";
      
      await driver.sleep(500);

      expect(actualText).toBe(expectedText);
    });

    // Verify if 'View BucketList' link exists
    test("should have link to '/bucketlist' route", async () => {
      const linkElement = await driver.findElement(selenium.By.xpath("//body/div[@id='root']/a[1]"));
      const actualHref = await linkElement.getAttribute("href");
      const expectedHref = "/bucketlist";
      
      await driver.sleep(500);

      expect(actualHref).toContain(expectedHref);
    });

    // Verify if 'View BucketList' link works
    test("should navigate to '/bucketlist' when link is clicked", async () => {
      const linkElement = await driver.findElement(selenium.By.xpath("//body/div[@id='root']/a[1]"));
      
      await linkElement.click();
      await driver.sleep(500);

      const currentUrl = await driver.getCurrentUrl();

      expect(currentUrl).toBe("http://localhost:3000/bucketlist");
    });
  });

  // Testing '/bucketlist' route
  describe("BucketList route", () => {

    // Verify the H2 text
    test("should have h2 as 'Things to do:'", async () => {
      const h2Element = await driver.findElement(selenium.By.css("h2"));
      const actualText = await h2Element.getText();
      const expectedText = "Things to do:";
      
      await driver.sleep(500);

      expect(actualText).toBe(expectedText);
    });

    // Verify if there are BucketList Items
    test("should have list of items with 'View/Edit' links", async () => {
      const linkElementsInTable = await driver.findElements(selenium.By.css("tbody a"));
      
      await driver.sleep(500);

      expect(linkElementsInTable.length > 0).toBe(true);
    });

    // Verify if 'Mark All Done!' button is working as expected
    test("should mark all item as Done when 'Mark All Done!' button is clicked", async () => {
      // Get Buttons and List of Items from Page
      const markAllPendingBtn = await driver.findElement(selenium.By.xpath("//button[@name='all-pending-btn']"));
      const markAllDoneBtn = await driver.findElement(selenium.By.xpath("//button[@name='all-done-btn']"));
      const bucketListItems = await driver.findElements(selenium.By.css("tbody tr"));
      
      // Get total number of items 
      const totalNumOfItems = bucketListItems.length;

      // Reset 'Done' State by marking all Items as Pending.
      await markAllPendingBtn.click();
      await driver.sleep(1000);

      // Mark all Items as Done.
      await markAllDoneBtn.click();      
      await driver.sleep(1000);
      
      // Get All 'Done' Items and Compare the numbers from before.
      const bucketListItemsCompleted = await driver.findElements(selenium.By.css("tbody tr"));
      const numOfItemCompleted = await bucketListItemsCompleted.filter(async (item) => await item.getText("Done!")).length;

      expect(numOfItemCompleted).toBe(totalNumOfItems);
    });
  });

  // Test '/bucketlist/new' route
  describe("'Add New BucketList Item' Route", () => {

    // Verify the H2 text
    test("should have h2 as 'Add New BucketList Item'", async () => {

      // Navigate to Add New BucketList Route
      driver.navigate().to("http://localhost:3000/bucketlist/new");
  
      const h2Element = await driver.findElement(selenium.By.css("h2"));
      const actualText = await h2Element.getText();
      const expectedText = "Add New BucketList Item";
      
      await driver.sleep(500);

      expect(actualText).toBe(expectedText);
    });

    // Verify if we are able to add New BucketList Item
    test("should be able to add new bucket list item", async () => {

      // Get All Elements including dropdown Option element for 'High' Risk Level
      const titleInput = await driver.findElement(selenium.By.name("title"));
      const riskLevelSelect = await driver.findElement(selenium.By.id("risklevel"));
      const riskLevelHighOption = await driver.findElement(selenium.By.css("option[value='H']"));
      const statusCheckbox = await driver.findElement(selenium.By.id("status"));
      const addButton = await driver.findElement(selenium.By.css("button[type='submit']"));

      // Perform Actions
      await titleInput.sendKeys("Get Married");
      await driver.sleep(500);
      await riskLevelSelect.click();
      await riskLevelHighOption.click();
      await driver.sleep(500);
      await statusCheckbox.click();
      await driver.sleep(500);
      await addButton.click();
      await driver.sleep(1000);

      // Get Last Bucket List Item
      const bucketListItems = await driver.findElements(selenium.By.css("tbody tr"));
      const lastBucketListItem = await bucketListItems[bucketListItems.length - 1];
      const lastItemText = await lastBucketListItem.getText();

      await driver.sleep(2000);

      expect(lastItemText).toContain("Get Married");

    });

    // Verify if we are able to Delete the recently added BucketList Item
    test("should be able to delete the last bucket list item", async () => {
      // Get Last Bucket List Item's View/Edit Link
      const allViewEditLinks = await driver.findElements(selenium.By.css("tbody tr a"));
      const lastViewEditLink = await allViewEditLinks[allViewEditLinks.length - 1];

      // Number of BucketList Items
      const numOfItems = allViewEditLinks.length;

      await lastViewEditLink.click();
      await driver.sleep(1000);

      // On View/Edit Page, Get the 'Delete Item' Button
      const deleteItemBtn = await driver.findElement(selenium.By.xpath("//button[normalize-space()='Delete Item']"))

      await deleteItemBtn.click();
      await driver.sleep(1000);

      // On BucketList Page, check the new number of items
      const itemsAfterDelete = await driver.findElements(selenium.By.css("tbody tr a"));

      // Number of BucketList Items after Delete
      const numOfItemsAfterDelete = itemsAfterDelete.length;

      await driver.sleep(1000);

      expect(numOfItems - 1).toBe(numOfItemsAfterDelete);
    });

  });
});
