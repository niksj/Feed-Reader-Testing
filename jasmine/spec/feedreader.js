/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* A test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* Test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('url defined', function () {
            for (feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });
        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined', function () {
            for (feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    describe('The menu', function () {

        /* A test that ensures the menu element is
         * hidden by default. 
         */
        it('is hidden', function () {
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('toggles on and off', function () {
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });
    describe('Initial Entries', function () {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         beforeEach(function(done){
            loadFeed(0, done);
         });
         it('completes work', function(){
            var feed = $('.feed .entry');
            expect(feed.length).toBeGreaterThan(0);
         });
        

    });

    describe('New Feed Selection', function(){
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var prevFeed, newFeed;
        
        beforeEach(function (done) {
            loadFeed(0, function () {
                prevFeed = $('.feed').text();

                loadFeed(1, function () {
                    newFeed = $('.feed').text();
                    done();
                });
            });

        });

        it('content changes', function(){
            expect(newFeed).not.toBe(prevFeed);
        });
    });

}());
