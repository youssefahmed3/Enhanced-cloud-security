import responses
from fastapi.testclient import TestClient
from main import app
import json
import pytest
import os


client = TestClient(app)
# List of base images
base_images = os.listdir('./testimages/newImg')
embed_results = []
extract_results = []
""" 
@pytest.mark.parametrize('base_image', base_images)
@responses.activate
def test_embed_sift(base_image):

    
    # Mock the external requests to fetch the images
    with open(f"./testimages/newImg/{base_image}", 'rb') as img:
        responses.add(responses.GET, f'http://localhost:8000/testimages/newImg/{base_image}', body=img.read(), status=200)

    # Send a POST request to the /api/v1/embed_sift endpoint
    response = client.post("/api/v1/embed_sift", json={
        "base_url": f"http://localhost:8000/testimages/newImg/{base_image}",
        "watermark_url": "http://localhost:8000/watermarks/watermark.jpg"
    })

    # Check the response status code
    assert response.status_code == 200

    # Check the response JSON
    data = response.json()
    assert 'image' in data
    assert 'psnr' in data
    assert 'nc' in data
    assert 'ssim' in data
    assert 'ber' in data

    # Check if the 'psnr' value is over 35
    # assert data['psnr'] > 50

    embed_results.append(data)
    
    # Write the results list to a file
    with open('test_results_embed.json', 'w') as f:
        json.dump(embed_results, f)
        
    assert data['psnr'] >= 30
    assert data['nc'] >= 0.4
    
 """
@pytest.mark.parametrize('base_image', base_images)
@responses.activate
def test_extract_sift(base_image):

    
    # Mock the external requests to fetch the images
    with open(f"./images/watermarked_{base_image}", 'rb') as img:
        responses.add(responses.GET, f'http://localhost:8000/testimages/embedded_with_noise/noised_embedded_imgs/sp_{base_image}', body=img.read(), status=200)

    # Send a POST request to the /api/v1/extract_watermark endpoint
    response = client.post("/api/v1/extract_watermark_sift", json={
        "base_url": f"http://localhost:8000/testimages/newImg/{base_image}",
        "watermarked_url": f"http://localhost:8000/testimages/embedded_with_noise/noised_embedded_imgs/sp_{base_image}"
    })

    # Check the response status code
    assert response.status_code == 200

    # Check the response JSON
    data = response.json()
    assert 'extracted_watermark' in data
    assert 'nc' in data
    assert 'ssim' in data
    assert 'ber' in data

    # Check if the 'psnr' value is over 35
    # assert data['psnr'] > 50

    extract_results.append(data)
    
    # Write the results list to a file
    with open('test_results_extract_with_noise.json', 'w') as f:
        json.dump(extract_results, f)
        
    assert data['nc'] >= 0.4