from playwright.sync_api import sync_playwright, expect
import time

def test_search_limit():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the homepage
        print("Navigating to http://localhost:3000")
        page.goto("http://localhost:3000")

        # Wait for the page to load
        page.wait_for_selector("#skills", timeout=60000)

        # Try different scroll positions until the filter bar is visible
        found = False
        for scroll_top in range(500, 5001, 500):
            print(f"Scrolling to {scroll_top}")
            page.evaluate(f"window.scrollTo(0, {scroll_top})")
            time.sleep(1)
            # Check if Searchbar placeholder is visible
            if page.get_by_placeholder("Search everything...").is_visible():
                print(f"Filter bar found at {scroll_top}")
                found = True
                break

        if not found:
            print("Filter bar not found, taking debug screenshot")
            page.screenshot(path="verification/debug_not_found.png")
            browser.close()
            return

        # Find the search input
        search_input = page.get_by_placeholder("Search everything...")

        # Try to type a very long string
        long_string = "a" * 150
        print("Typing long string")
        search_input.fill("") # Clear first
        search_input.type(long_string)

        # Check the value of the input
        value = search_input.input_value()
        print(f"Input value length: {len(value)}")

        # Take a screenshot
        page.screenshot(path="verification/search_limit.png")

        browser.close()

if __name__ == "__main__":
    test_search_limit()
