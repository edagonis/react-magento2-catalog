<?php

use Magento\Catalog\Helper\Image;

namespace Fidera\CatalogComponent\Controller\Index;

class Index extends \Magento\Framework\App\Action\Action
{
    /**
     * @var \Magento\Framework\Controller\Result\JsonFactory
     */
    protected $resultJsonFactory;

    /**
     * @var \Magento\Catalog\Model\ResourceModel\Product\CollectionFactory
     */
    protected $productCollectionFactory;

    /**
     * @var \Magento\Catalog\Helper\Image
     */
    protected $productImageHelper;

    /**
     * Constructor
     *
     * @param \Magento\Framework\App\Action\Context  $context
     * @param \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory,
     * @param \Magento\Catalog\Model\ResourceModel\Product\CollectionFactory $productCollectionFactory,
     * @param \Magento\Catalog\Helper\Image $productImageHelper
     */
    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory,
        \Magento\Catalog\Model\ResourceModel\Product\CollectionFactory $productCollectionFactory,
        //\Magento\Catalog\Helper\Image $productImageHelper,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->_resultJsonFactory = $resultJsonFactory;
        $this->_productCollectionFactory = $productCollectionFactory;
        //$this->_productImageHelper = $productImageHelper;
    }

    /**
     * Execute view action
     * 
     * Returns JSON data from product collection
     *
     * @return \Magento\Framework\Controller\Result\JsonFactory
     */
    public function execute()
    {
        $collection = $this->_productCollectionFactory->create();
        $collection->addAttributeToSelect('*');
        $collection->setPageSize(10); // fetching only 10 products
        $result = $this->_resultJsonFactory->create();

        $resultData = array();
        foreach($collection as $product) {
            $resultData[] = array(
                'name' => $product->getName(),
                'sku' => $product->getSku(),
                'finalprice' => $product->getFinalPrice(),
                'imageUrl' => $product->getImage(),
                'productUrl' => $product->getProductUrl()
            );
        }

        /** @var \Magento\Framework\Controller\Result\Json $result */
        return $result->setData($resultData);
    }
}
