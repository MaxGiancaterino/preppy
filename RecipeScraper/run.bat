:: scrape new recipes
:: set (numToDownload) to negative to download indefinitely
:: java -jar scraper.jar download (startingIndex) (numToDownload)
:: java -jar scraper.jar download 007322 -1

:: compile existing recipes
:: java -jar scraper.jar parse (numThreads) [startingIndex] [endingIndex]
 java -jar scraper.jar parse 8 6663 7000
pause