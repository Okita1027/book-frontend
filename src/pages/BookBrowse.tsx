import React, { useState, useRef } from "react";
import dayjs from "dayjs";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Input,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import {
  BookOutlined,
  CalendarOutlined,
  HomeOutlined,
  ReloadOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import type { BookSearchParams } from "@/services";
import { bookService } from "@/services";
import type { BookVO } from "@/types";
import "./BookBrowse.scss";

const { Title, Text } = Typography;

/**
 * 前台图书阅览系统主页
 * 提供图书搜索和浏览功能
 */
const BookBrowse: React.FC = () => {
  // 各个搜索框中的值
  const title = useRef<string>("");
  const isbn = useRef<string>("");
  const authorName = useRef<string>("");
  const categoryName = useRef<string>("");
  const publisherName = useRef<string>("");
  const publishedDateBegin = useRef<string>("");
  const publishedDateEnd = useRef<string>("");

  // 实际搜索参数
  const [searchParams, setSearchParams] = useState<BookSearchParams>({});

  // 获取图书数据
  const { data: books = [], isLoading } = useQuery<BookVO[]>({
    queryKey: ["books", searchParams],
    queryFn: () => bookService.search(searchParams),
  });

  // 执行搜索
  const handleSearch = () => {
    // 过滤掉空值，只传递有值的参数
    const params: BookSearchParams = {};
    if (title.current?.trim()) params.title = title.current.trim();
    if (isbn.current?.trim()) params.isbn = isbn.current.trim();
    if (authorName.current?.trim())
      params.authorName = authorName.current.trim();
    if (categoryName.current?.trim())
      params.categoryName = categoryName.current.trim();
    if (publisherName.current?.trim())
      params.publisherName = publisherName.current.trim();
    if (publishedDateBegin.current?.trim())
      params.publishedDateBegin = publishedDateBegin.current.trim();
    if (publishedDateEnd.current?.trim())
      params.publishedDateEnd = publishedDateEnd.current.trim();

    setSearchParams(params);
  };

  // 用于强制重新渲染搜索表单的状态
  const [resetKey, setResetKey] = useState(0);

  // 重置搜索
  const handleReset = () => {
    // 重置所有值
    title.current = "";
    isbn.current = "";
    authorName.current = "";
    categoryName.current = "";
    publisherName.current = "";
    publishedDateBegin.current = "";
    publishedDateEnd.current = "";
    
    // 通过改变key值强制重新渲染搜索表单
    setResetKey(prev => prev + 1);
    
    setSearchParams({});
  };

  return (
    <div className="book-browse">
      {/* 页面标题 */}
      <div className="book-browse-header">
        <Title level={1} className="title">
          <BookOutlined /> 图书阅览系统
        </Title>
        <Text type="secondary" className="subtitle">
          发现知识的海洋，探索阅读的乐趣
        </Text>
      </div>

      {/* 搜索区域 */}
      <Card className="book-browse-search">
        <div className="search-body" key={resetKey}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <div className="search-label">
                <Text strong>图书名称</Text>
              </div>
              <Input
                placeholder="请输入图书名称"
                allowClear
                size="large"
                defaultValue={title.current}
                onChange={(e) => {
                  title.current = e.target.value;
                }}
                onPressEnter={handleSearch}
                className="search-input"
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <div className="search-label">
                <Text strong>作者</Text>
              </div>
              <Input
                placeholder="请输入作者名称"
                allowClear
                size="large"
                defaultValue={authorName.current}
                onChange={(e) => {
                  authorName.current = e.target.value;
                }}
                onPressEnter={handleSearch}
                className="search-input"
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <div className="search-label">
                <Text strong>类别名称</Text>
              </div>
              <Input
                placeholder="请输入类别名称"
                allowClear
                size="large"
                defaultValue={categoryName.current}
                onChange={(e) => {
                  categoryName.current = e.target.value;
                }}
                onPressEnter={handleSearch}
                className="search-input"
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <div className="search-label">
                <Text strong>出版社名称</Text>
              </div>
              <Input
                placeholder="请输入出版社名称"
                allowClear
                size="large"
                defaultValue={publisherName.current}
                onChange={(e) => {
                  publisherName.current = e.target.value;
                }}
                onPressEnter={handleSearch}
                className="search-input"
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <div className="search-label">
                <Text strong>ISBN</Text>
              </div>
              <Input
                placeholder="请输入ISBN"
                allowClear
                size="large"
                defaultValue={isbn.current}
                // ISBN只允许输入数字,最长13位
                maxLength={13}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Tab') {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  isbn.current = e.target.value;
                }}
                onPressEnter={handleSearch}
                className="search-input"
              />
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <div className="search-label">
                <Text strong>出版日期开始</Text>
              </div>
              <DatePicker
                placeholder="请选择开始日期"
                allowClear
                size="large"
                defaultValue={
                  publishedDateBegin.current
                    ? dayjs(publishedDateBegin.current)
                    : null
                }
                onChange={(date) => {
                  publishedDateBegin.current = date ? date.format("YYYY-MM-DD") : "";
                }}
                className="search-datepicker"
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <div className="search-label">
                <Text strong>出版日期结束</Text>
              </div>
              <DatePicker
                placeholder="请选择结束日期"
                allowClear
                size="large"
                defaultValue={
                  publishedDateEnd.current
                    ? dayjs(publishedDateEnd.current)
                    : null
                }
                onChange={(date) => {
                  publishedDateEnd.current = date ? date.format("YYYY-MM-DD") : "";
                }}
                className="search-datepicker"
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <div className="search-label">
                <Text strong>操作</Text>
              </div>
              <Space>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  size="large"
                  onClick={handleSearch}
                  className="search-button"
                >
                  搜索
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  size="large"
                  onClick={handleReset}
                  className="search-button"
                >
                  重置
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
      </Card>

      {/* 图书展示区域 */}
      <Card
        title={`图书列表 (共 ${books.length} 本)`}
        className="book-browse-list"
      >
        <div className="list-body">
          <Spin spinning={isLoading}>
            {books.length === 0 ? (
              <Empty description="暂无图书数据" className="empty-state" />
            ) : (
              <Row gutter={[16, 16]}>
                {books.map((book) => (
                  <Col xs={24} sm={12} md={8} lg={4} xl={4} key={book.id}>
                    <Card hoverable className="book-browse-card">
                      <div className="card-body">
                        <Title
                          level={5}
                          ellipsis={{ rows: 2 }}
                          className="card-title"
                        >
                          {book.title}
                        </Title>
                        <Text type="secondary" className="card-info">
                          <UserOutlined /> {book.authorName || "未知作者"}
                        </Text>
                        <Text type="secondary" className="card-info">
                          <HomeOutlined /> {book.publisherName || "未知出版社"}
                        </Text>
                        <Text type="secondary" className="card-date">
                          <CalendarOutlined />{" "}
                          {book.publishedDate
                            ? dayjs(book.publishedDate).format("YYYY-MM-DD")
                            : "未知日期"}
                        </Text>
                        <div className="card-tags">
                          {book.categoryNames?.map((categoryName, index) => (
                            <Tag key={index} color="blue">
                              {categoryName}
                            </Tag>
                          )) || <Tag color="blue">未分类</Tag>}
                          <Tag color={book.available > 0 ? "green" : "red"}>
                            可借: {book.available}/{book.stock}
                          </Tag>
                        </div>
                        <Text type="secondary" className="card-isbn">
                          ISBN: {book.isbn || "暂无"}
                        </Text>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Spin>
        </div>
      </Card>
    </div>
  );
};

export default BookBrowse;
