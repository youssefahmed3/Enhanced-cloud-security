import cv2 # for reading and writing images
import numpy as np # for mathematical operations

def calculate_ssim(img1, img2):
    # If the number of color channels doesn't match, convert the images to grayscale
    if len(img1.shape) != len(img2.shape):
        if len(img1.shape) == 3:
            img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
        if len(img2.shape) == 3:
            img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)

    # Ensure the images are the same size
    if img1.shape != img2.shape:
        # Resize img2 to match img1
        img2 = cv2.resize(img2, (img1.shape[1], img1.shape[0]))

    # Calculate mean of each image
    mu1 = cv2.mean(img1)[0]
    mu2 = cv2.mean(img2)[0]

    # Calculate variance and covariance
    sigma1 = cv2.mean((img1 - mu1)**2)[0]
    sigma2 = cv2.mean((img2 - mu2)**2)[0]
    sigma12 = cv2.mean((img1 - mu1)*(img2 - mu2))[0]

    # Calculate SSIM
    ssim = ((2*mu1*mu2 + 1.0)*(2*sigma12 + 1.0)) / ((mu1**2 + mu2**2 + 1.0)*(sigma1 + sigma2 + 1.0))

    return ssim

def calculate_ber(img1, img2):
    # If the number of color channels doesn't match, convert the images to grayscale
    if len(img1.shape) != len(img2.shape):
        if len(img1.shape) == 3:
            img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
        if len(img2.shape) == 3:
            img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)

    # Ensure the images are the same size
    if img1.shape != img2.shape:
        # Resize img2 to match img1
        img2 = cv2.resize(img2, (img1.shape[1], img1.shape[0]))

    # Calculate the total number of pixels
    total_pixels = img1.shape[0] * img1.shape[1]

    # Calculate the number of different pixels
    different_pixels = np.sum(img1 != img2)

    # Calculate BER
    ber = different_pixels / total_pixels

    return ber

def calculate_nc(image, template):
    # If the number of color channels doesn't match, convert the images to grayscale
    if len(image.shape) != len(template.shape):
        if len(image.shape) == 3:
            image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        if len(template.shape) == 3:
            template = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)

    # Ensure the images are the same size
    if image.shape != template.shape:
        # Resize the template to match the image
        template = cv2.resize(template, (image.shape[1], image.shape[0]))

    assert image.shape == template.shape

    # Calculate the mean of the images
    image_mean = np.mean(image)
    template_mean = np.mean(template)

    # Subtract the mean from the images
    image_zero_mean = image - image_mean
    template_zero_mean = template - template_mean

    # Calculate the numerator (the sum of the product of the zero-mean images)
    numerator = np.sum(image_zero_mean * template_zero_mean)

    # Calculate the denominator (the square root of the sum of the squares of the zero-mean images)
    denominator = np.sqrt(np.sum(image_zero_mean**2) * np.sum(template_zero_mean**2))

    # Calculate the normalized correlation
    nc = numerator / denominator

    return nc


def calculate_psnr(original_image, reconstructed_image):    
    # If the number of color channels doesn't match, convert the images to grayscale
    if len(original_image.shape) != len(reconstructed_image.shape):
        if len(original_image.shape) == 3:
            original_image = cv2.cvtColor(original_image, cv2.COLOR_BGR2GRAY)
        if len(reconstructed_image.shape) == 3:
            reconstructed_image = cv2.cvtColor(reconstructed_image, cv2.COLOR_BGR2GRAY)

    # Resize reconstructed_image to match the shape of original_image
    if original_image.shape != reconstructed_image.shape:
        reconstructed_image = cv2.resize(reconstructed_image, (original_image.shape[1], original_image.shape[0]))

    assert original_image.shape == reconstructed_image.shape

    # Calculate the Mean Squared Error (MSE)
    mse = np.mean((original_image - reconstructed_image) ** 2)

    # If the MSE is zero, the images are identical, and the PSNR is infinity
    if mse == 0:
        return float('inf')

    # Otherwise, calculate the PSNR
    max_pixel = 255.0
    psnr = 20 * np.log10(max_pixel / np.sqrt(mse))

    return psnr