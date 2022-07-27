import React, { useState } from 'react'
import millify from 'millify'
import {Select, Typography, Row, Col, Statistic, Avatar, Card} from "antd"
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'

const demoImageUrl = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News"
const {Text, Title} = Typography;
const {Option } = Select;

const News = ({simplified}) => {
    const [newsCategory, setNewsCategory] = useState(`Cryptocurrency`);
    const {data: cryptoNews } = useGetCryptoNewsQuery({newsCategory: newsCategory, count: simplified ? 6 : 100})

    const { data, isFetching } = useGetCryptosQuery(10);
    
    if(!cryptoNews?.value) return "Loading..."

    return (
      <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select 
              showSearch
              className='select-news'
              placeholder="Select crypto"
              optionFilterProp='children'
              onChange={(value) => setNewsCategory(value)}
              filter={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >=0 }
            >
              <Option value="cryptocurrency">
                Cryptocurrencies
              </Option>
              {data?.data?.coins.map((coin) => 
                <Option value={coin.name}>
                  {coin.name}
                </Option>
              )}
            </Select>
          </Col>
        )}
        {cryptoNews.value.map((news, i)=> (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className='news-card'>
              <a href={news.url} target="_blank">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img 
                  style={{
                    display: 'inline',
                    maxWidth: '200px',
                    maxHeight: '200px'
                  }}
                  src={news?.image?.thumbnail?.contentUrl || demoImageUrl} alt="news"/>
                </div>
                <p>
                  {news.description > 100 ? `${news.description.substring(0, 100)} ...` : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImageUrl} alt ="news"/>
                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                  </div>
                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
      </>
    )
  }

export default News