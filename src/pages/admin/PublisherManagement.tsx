// 出版社管理页面
import React, {useRef, useState} from 'react';
import {type ActionType, type ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, Form, Input, message, Modal, Popconfirm} from 'antd';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {publisherService} from '@/services';
import type {Publisher} from '@/types';
import './PublisherManagement.css';

const PublisherManagement: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const [form] = Form.useForm();
    const [editingPublisher, setEditingPublisher] = useState<Publisher | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<Publisher[]>([]);

    // 表格列定义
    const columns: ProColumns<Publisher>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 80,
            search: false,
        },
        {
            title: '出版社名称',
            dataIndex: 'name',
            ellipsis: true,
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '请输入出版社名称',
                    },
                ],
            },
        },
        {
            title: '图书数量',
            dataIndex: 'books',
            hideInTable: true,
            search: false,
            render: (_, record) => record.books?.length || 0,
        },
        {
            title: '创建时间',
            dataIndex: 'createdTime',
            valueType: 'dateTime',
            search: false,
            width: 180,
        },
        {
            title: '更新时间',
            dataIndex: 'updatedTime',
            valueType: 'dateTime',
            search: false,
            width: 180,
        },
        {
            title: '操作',
            valueType: 'option',
            width: 150,
            render: (_, record) => [
                <Button
                    key="edit"
                    type="link"
                    size="small"
                    icon={<EditOutlined/>}
                    onClick={() => handleEdit(record)}
                >
                    编辑
                </Button>,
                <Popconfirm
                    key="delete"
                    title="确定要删除这个出版社吗？"
                    onConfirm={() => handleDelete(record.id)}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button
                        type="link"
                        size="small"
                        danger
                        icon={<DeleteOutlined/>}
                    >
                        删除
                    </Button>
                </Popconfirm>,
            ],
        },
    ];

    // 批量删除处理
    const handleBatchDelete = async () => {
        try {
            const responses = await Promise.all(
                selectedRowKeys.map(id => publisherService.delete(id as number))
            );
            const successCount = responses.filter(res => res.status === 200 || res.status === 204).length;
            if (successCount === selectedRowKeys.length) {
                message.success(`批量删除成功，共删除 ${successCount} 个出版社`);
            } else {
                message.success(`批量删除完成，共处理 ${selectedRowKeys.length} 个出版社`);
            }
            setSelectedRowKeys([]);
            setSelectedRows([]);
            actionRef.current?.reload();
        } catch (error) {
            message.error('批量删除失败' + error);
        }
    };

    // 行选择配置
    const rowSelection = {
        selectedRowKeys,
        onChange: (keys: React.Key[], rows: Publisher[]) => {
            setSelectedRowKeys(keys);
            setSelectedRows(rows);
        },
    };

    // 获取出版社列表
    const fetchPublishers = async (params: any) => {
        try {
            const data = await publisherService.getAll();

            // 根据搜索条件过滤数据
            let filteredData = data;
            if (params.name) {
                filteredData = data.filter((item: Publisher) =>
                    item.name.toLowerCase().includes(params.name.toLowerCase())
                );
            }

            return {
                data: filteredData,
                success: true,
                total: filteredData.length,
            };
        } catch (error) {
            message.error('获取出版社列表失败' + error);
            return {
                data: [],
                success: false,
                total: 0,
            };
        }
    };

    // 处理新增
    const handleAdd = () => {
        setEditingPublisher(null);
        form.resetFields();
        setModalVisible(true);
    };

    // 处理编辑
    const handleEdit = (record: Publisher) => {
        setEditingPublisher(record);
        form.setFieldsValue({
            name: record.name,
        });
        setModalVisible(true);
    };

    // 删除出版社
    const handleDelete = async (id: number) => {
        try {
            const response = await publisherService.delete(id);
            if (response.status === 200 || response.status === 204) {
                message.success('删除成功');
            } else {
                message.success('删除操作已完成');
            }
            actionRef.current?.reload();
        } catch (error) {
            message.error('删除失败');
        }
    };

    // 处理保存
    const handleSave = async () => {
        try {
            const values = await form.validateFields();

            let response;
            if (editingPublisher) {
                // 编辑
                response = await publisherService.update(editingPublisher.id, values);
                if (response.status === 200) {
                    message.success('更新成功');
                } else {
                    message.success('更新操作已完成');
                }
            } else {
                // 新增
                response = await publisherService.create(values);
                if (response.status === 201) {
                    message.success('创建成功');
                } else {
                    message.success('创建操作已完成');
                }
            }

            setModalVisible(false);
            actionRef.current?.reload();
        } catch (error) {
            message.error(editingPublisher ? '更新失败' : '创建失败');
        }
    };

    return (
        <div className="publisher-management">
            <ProTable<Publisher>
                headerTitle="出版社管理"
                actionRef={actionRef}
                rowKey="id"
                rowSelection={rowSelection}
                search={{
                    labelWidth: 'auto',
                }}
                toolBarRender={() => [
                    <Button
                        key="add"
                        type="primary"
                        icon={<PlusOutlined/>}
                        onClick={handleAdd}
                    >
                        新增出版社
                    </Button>,
                    selectedRowKeys.length > 0 && (
                        <Popconfirm
                            key="batchDelete"
                            title={`确定要删除选中的 ${selectedRowKeys.length} 个出版社吗？`}
                            onConfirm={handleBatchDelete}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button
                                type="primary"
                                danger
                                icon={<DeleteOutlined/>}
                            >
                                批量删除 ({selectedRowKeys.length})
                            </Button>
                        </Popconfirm>
                    ),
                ]}
                request={fetchPublishers}
                columns={columns}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                }}
                options={{
                    reload: true,
                    density: true,
                    fullScreen: true,
                    setting: true,
                }}
            />

            <Modal
                title={editingPublisher ? '编辑出版社' : '新增出版社'}
                open={modalVisible}
                onOk={handleSave}
                onCancel={() => setModalVisible(false)}
                width={600}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    preserve={false}
                >
                    <Form.Item
                        name="name"
                        label="出版社名称"
                        rules={[
                            {required: true, message: '请输入出版社名称'},
                            {max: 100, message: '出版社名称不能超过100个字符'},
                        ]}
                    >
                        <Input placeholder="请输入出版社名称"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default PublisherManagement;