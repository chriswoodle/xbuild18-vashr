########### Python 3.2 #############
import boto3, sys
s3 = boto3.resource('s3')
data = open(sys.argv[1], 'rb')
s3.Bucket('xbuild-object').put_object(ACL='public-read', Key='candidate.jpg', Body=data, ContentType='image/jpeg')

