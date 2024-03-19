import cv2 # for reading and writing images
import numpy as np # for mathematical operations
import pywt # for discrete wavelet transform
import logging # for logging

class watermarking_Scheme: 
    def __init__(self, original_image, watermark_image, alpha = 0.01):
        self.original_image = original_image
        self.watermark_image = watermark_image
        self.alpha = alpha # This should be the same alpha used during the embedding process
         
    def decompose1(self, image):
        #Apply DWT on the orignal image
        coeffs = pywt.dwt2(image, 'haar')
        LL, (LH, HL, HH) = coeffs

        return LL, (LH, HL, HH)

    def decompose2(self, LL):
         # Apply DWT on the decomposed image subband LL to get LL2
        coeffs2 = pywt.dwt2(LL, 'haar')
        LL2, (LH2, HL2, HH2) = coeffs2

        return LL2, (LH2, HL2, HH2)
    
    def dct_apply(self, selected_coeffs):
        selected_coeffs = np.float32(selected_coeffs) # we convert the image to float32 because dct function works on floating points 
        selected_coeffs_dct = cv2.dct(selected_coeffs)
        return selected_coeffs_dct

    def embed_watermark(self):
        """ 
        1- Apply DWT on The original Image
        2- Apply DWT on the decomposed image subband LL to get LL2
        3- Apply DCT on the decomposed image subband LL2
        4- Apply IDCT on the decomposed image subband LL2
        5- Apply IDWT on The LL2 to get LL and then apply IDWT on LL to get the watermarked image
        6- Calculate the PSNR
        7- Calculate the NC 
        """
        
        # Check if the image is grayscale or color
        if len(self.original_image.shape) == 2:
            # The image is grayscale
            original_image_channels = [self.original_image]
            watermark_image_channels = [self.watermark_image]
        else:
            # The image is color
            original_image_channels = cv2.split(self.original_image)
            watermark_image_channels = cv2.split(self.watermark_image)

        watermarked_image_channels = []
        for original_image_channel, watermark_image_channel in zip(original_image_channels, watermark_image_channels):
            # Perform the watermarking process on each channel
            coeffs = self.decompose1(original_image_channel)
            LL, (LH, HL, HH) = coeffs
            coeffs2 = self.decompose2(HL)
            LL2, (LH2, HL2, HH2) = coeffs2
            HL2_dct = self.dct_apply(HL2)

            # Resize the watermark to match the LL2 sub-band dimensions
            watermark_resized = cv2.resize(watermark_image_channel, (HL2_dct.shape[1], HL2_dct.shape[0]))

            # Spread spectrum watermarking
            alpha = self.alpha  # This is the embedding strength factor
            # Convert watermark_resized to grayscale if it's a color image
            if len(watermark_resized.shape) == 3:
                watermark_resized = cv2.cvtColor(watermark_resized, cv2.COLOR_BGR2GRAY)
            HL2_dct_watermarked = HL2_dct + alpha * cv2.dct(np.float32(watermark_resized))

            # Apply inverse DCT and DWT
            watermarked_HL2 = cv2.idct(HL2_dct_watermarked)
            watermarked_subband_HL = pywt.idwt2((LL2, (LH2, watermarked_HL2, HH2)), 'haar')
            watermarked_image_channel = pywt.idwt2((LL, (LH, watermarked_subband_HL, HH)), 'haar')

            watermarked_image_channels.append(watermarked_image_channel)

        # Merge the watermarked channels back together
        watermarked_image = cv2.merge(watermarked_image_channels)

        return watermarked_image

    def extract_watermark(self, watermarked_image, original_image):
        # Check if the image is grayscale or color
        if len(watermarked_image.shape) == 2:
            # The image is grayscale
            watermarked_image_channels = [watermarked_image]
            original_image_channels = [original_image]
        else:
            # The image is color
            watermarked_image_channels = cv2.split(watermarked_image)
            original_image_channels = cv2.split(original_image)

        watermark_channels = []
        for watermarked_image_channel, original_image_channel in zip(watermarked_image_channels, original_image_channels):
            # Perform the inverse watermarking process on each channel
            coeffs = self.decompose1(watermarked_image_channel)
            LL, (LH, HL, HH) = coeffs
            coeffs2 = self.decompose2(HL)
            LL2, (LH2, HL2, HH2) = coeffs2
            HL2_dct = self.dct_apply(HL2)

            coeffs_orig = self.decompose1(original_image_channel)
            LL_orig, (LH_orig, HL_orig, HH_orig) = coeffs_orig
            coeffs2_orig = self.decompose2(HL_orig)
            LL2_orig, (LH2_orig, HL2_orig, HH2_orig) = coeffs2_orig
            HL2_dct_orig = self.dct_apply(HL2_orig)

            # Extract the watermark
            alpha = self.alpha  # This is the embedding strength factor
            watermark_channel = (HL2_dct - HL2_dct_orig) / alpha
            watermark_channel = cv2.idct(np.float32(watermark_channel))

            # Resize the watermark to its original size
            watermark_channel = cv2.resize(watermark_channel, (self.watermark_image.shape[1], self.watermark_image.shape[0]))

            watermark_channels.append(watermark_channel)

        # Merge the watermark channels back together
        watermark_image = cv2.merge(watermark_channels)

        return watermark_image

    def embed_with_SIFT(self):
        logging.basicConfig(filename='watermarking.log', level=logging.DEBUG)
        logging.info('Starting the watermarking process...')
        sift = cv2.xfeatures2d.SIFT_create()
        ogkeypoints, ogdescriptors = sift.detectAndCompute(self.original_image, None)
        
        original_dimensions = self.original_image.shape[:2]
        logging.info(f'Original image dimensions: {original_dimensions}')

        # Check if the image is grayscale or color
        if len(self.original_image.shape) == 2:
            # The image is grayscale
            original_image_channels = [self.original_image]
            watermark_image_channels = [self.watermark_image]
        else:
            # The image is color
            original_image_channels = cv2.split(self.original_image)
            watermark_image_channels = cv2.split(self.watermark_image)

        watermarked_image_channels = []
        for original_image_channel, watermark_image_channel in zip(original_image_channels, watermark_image_channels):
            # Perform the watermarking process on each channel
            coeffs = self.decompose1(original_image_channel)
            LL, (LH, HL, HH) = coeffs
            coeffs2 = self.decompose2(HL)
            LL2, (LH2, HL2, HH2) = coeffs2
            HL2_dct = self.dct_apply(HL2)

            # Resize the watermark to match the LL2 sub-band dimensions
            watermark_resized = cv2.resize(watermark_image_channel, (HL2_dct.shape[1], HL2_dct.shape[0]))

            # Spread spectrum watermarking
            alpha = self.alpha  # This is the embedding strength factor
            # Convert watermark_resized to grayscale if it's a color image
            if len(watermark_resized.shape) == 3:
                watermark_resized = cv2.cvtColor(watermark_resized, cv2.COLOR_BGR2GRAY)
            HL2_dct_watermarked = HL2_dct + alpha * cv2.dct(np.float32(watermark_resized))

            # Apply inverse DCT and DWT
            watermarked_HL2 = cv2.idct(HL2_dct_watermarked)
            watermarked_subband_HL = pywt.idwt2((LL2, (LH2, watermarked_HL2, HH2)), 'haar')

            # Check the sizes of LL, LH, watermarked_subband_HL, and HH
            LL_shape = LL.shape
            LH_shape = LH.shape
            watermarked_subband_HL_shape = watermarked_subband_HL.shape
            HH_shape = HH.shape

            logging.info(f'LL shape: {LL_shape}')
            logging.info(f'LH shape: {LH_shape}')
            logging.info(f'Watermarked subband HL shape: {watermarked_subband_HL_shape}')
            logging.info(f'HH shape: {HH_shape}')

            # Find the maximum shape
            max_shape = np.maximum.reduce([LL_shape, LH_shape, watermarked_subband_HL_shape, HH_shape])

            # Resize the arrays
            LL = np.resize(LL, max_shape)
            LH = np.resize(LH, max_shape)
            watermarked_subband_HL = np.resize(watermarked_subband_HL, max_shape)
            HH = np.resize(HH, max_shape)

            watermarked_image_channel = pywt.idwt2((LL, (LH, watermarked_subband_HL, HH)), 'haar')

            watermarked_image_channels.append(watermarked_image_channel)

        # Merge the watermarked channels back together
        watermarked_image = cv2.merge(watermarked_image_channels)
        

        # Ensure the image is not empty
        if watermarked_image is None or watermarked_image.size == 0:
            raise ValueError("The image is empty")

        # Convert the image to 8-bit single-channel image if it's not
        if watermarked_image.dtype != np.uint8:
            watermarked_image = cv2.convertScaleAbs(watermarked_image)

        logging.info('Finished the watermarking process.')
        return watermarked_image
    
    def extract_with_SIFT(self, original_image, watermarked_image):
        MIN_NUM_GOOD_MATCHES = 10  # Define the minimum number of good matches
        sift = cv2.SIFT_create()

        # Find keypoints and descriptors in the base image
        keypoints_base, descriptors_base = sift.detectAndCompute(original_image, None)

        best_num_matches = 0
        best_H = None
        best_rotated_watermarked_image = None

        # Try all four possible rotations
        for angle in [0, 90, 180, 270]:
            if angle == 0:
                rotated_watermarked_image = watermarked_image
            else:
                rotated_watermarked_image = cv2.rotate(watermarked_image, {
                    90: cv2.ROTATE_90_CLOCKWISE,
                    180: cv2.ROTATE_180,
                    270: cv2.ROTATE_90_COUNTERCLOCKWISE
                }[angle])

            # Find keypoints and descriptors in the rotated image
            keypoints_rotated, descriptors_rotated = sift.detectAndCompute(rotated_watermarked_image, None)

            # Initialize matcher
            matcher = cv2.BFMatcher()

            # Match descriptors
            matches = matcher.knnMatch(descriptors_base, descriptors_rotated, k=2)

            # Apply ratio test
            good_matches = []
            for m, n in matches:
                if m.distance < 0.75 * n.distance:
                    good_matches.append(m)

            # If this rotation gives a better match, save it
            if len(good_matches) > best_num_matches:
                best_num_matches = len(good_matches)

                # Check if there are enough good matches
                if len(good_matches) > MIN_NUM_GOOD_MATCHES:
                    # Extract matched keypoints
                    src_pts = np.float32([keypoints_base[m.queryIdx].pt for m in good_matches]).reshape(-1, 1, 2)
                    dst_pts = np.float32([keypoints_rotated[m.trainIdx].pt for m in good_matches]).reshape(-1, 1, 2)

                    # Estimate homography
                    best_H, _ = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
                    best_rotated_watermarked_image = rotated_watermarked_image

        # Apply perspective transformation to correct geometric distortions
        corrected_watermarked_image = cv2.warpPerspective(best_rotated_watermarked_image, best_H, (original_image.shape[1], original_image.shape[0]))

        if len(corrected_watermarked_image.shape) == 2:
            # The image is grayscale
            corrected_watermarked_image_channels = [corrected_watermarked_image]
            original_image_channels = [original_image]
        else:
            # The image is color
            corrected_watermarked_image_channels = cv2.split(corrected_watermarked_image)
            original_image_channels = cv2.split(original_image)

        watermark_channels = []
        for corrected_watermarked_image_channel, original_image_channel in zip(corrected_watermarked_image_channels, original_image_channels):
            # Perform the inverse watermarking process on each channel
            coeffs = self.decompose1(corrected_watermarked_image_channel)
            LL, (LH, HL, HH) = coeffs
            coeffs2 = self.decompose2(HL)
            LL2, (LH2, HL2, HH2) = coeffs2
            HL2_dct = self.dct_apply(HL2)

            coeffs_orig = self.decompose1(original_image_channel)
            LL_orig, (LH_orig, HL_orig, HH_orig) = coeffs_orig
            coeffs2_orig = self.decompose2(HL_orig)
            LL2_orig, (LH2_orig, HL2_orig, HH2_orig) = coeffs2_orig
            HL2_dct_orig = self.dct_apply(HL2_orig)

            # Extract the watermark
            alpha = self.alpha  # This is the embedding strength factor
            watermark_channel = (HL2_dct - HL2_dct_orig) / alpha
            watermark_channel = cv2.idct(np.float32(watermark_channel))

            # Crop or pad the watermark to its original size
            watermark_channel = watermark_channel[:self.watermark_image.shape[0], :self.watermark_image.shape[1]]

            # Apply a smoothing filter to the watermark
            watermark_channel = cv2.GaussianBlur(watermark_channel, (5, 5), 0)

            watermark_channels.append(watermark_channel)

        # Merge the watermark channels back together
        watermark_image = cv2.merge(watermark_channels)

        return watermark_image