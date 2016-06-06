PWD=$(dirname $0)

# drop a prior index
curl -XDELETE 'http://192.168.99.100:8080/search/v1/index'

# create the index
curl -XPOST 'http://192.168.99.100:8080/search/v1/index'

# index test documents
while read -r line
do
    curl -XPOST -H 'Content-Type: application/json' -d "$line" 'http://192.168.99.100:8080/search/v1/upsert'
done < ${PWD}/test-data.json
