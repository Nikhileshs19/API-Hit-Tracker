import requests

# Make a GET request
response = requests.get("http://127.0.0.1:5000/api/hits")
print(f"GET request status code: {response.status_code}")

# Make a POST request
response = requests.post("http://127.0.0.1:5000/api/hits", json={"key": "value"})
print(f"POST request status code: {response.status_code}")
