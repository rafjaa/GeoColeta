# coding: utf-8

import math

def haversine(lat1, lng1, lat2, lng2):
    '''Haversine formula
    
    Calculate the distance between two points on the earth.

    Based in the faster public domain implementation, from:
        http://www.johndcook.com/python_longitude_latitude.html

    '''
    
    # Convert latitude and longitude to 
    # spherical coordinates in radians.
    # degrees_to_radians = math.pi / 180.0
    degrees_to_radians = 0.017453292519943295
        
    # phi = 90 - latitude
    phi1 = (90.0 - lat1) * degrees_to_radians
    phi2 = (90.0 - lat2) * degrees_to_radians
        
    # theta = longitude
    theta1 = lng1 * degrees_to_radians
    theta2 = lng2 * degrees_to_radians
        
    # Compute spherical distance from spherical coordinates. 
    cos = (math.sin(phi1) * math.sin(phi2) * math.cos(theta1 - theta2) + math.cos(phi1) * math.cos(phi2))
    arc = math.acos(cos)

    # Distance in meters
    return arc * 6367000