<?php

use Magento\Framework\App\ResponseInterface;

namespace Fidera\CatalogComponent\Controller\Index;

class Index extends \Magento\Framework\App\Action\Action
{


    /**
     * @var \Magento\Framework\Controller\Result\JsonFactory
     */
    protected $resultJsonFactory;

    /**
     * Constructor
     *
     * @param \Magento\Framework\App\Action\Context  $context
     */
    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory,
        \Magento\Catalog\Model\ResourceModel\Product\CollectionFactory $productCollectionFactory,        
    array $data = []
    ) {
        parent::__construct($context);
        $this->resultJsonFactory = $resultJsonFactory;
        $this->_productCollectionFactory = $productCollectionFactory;
    }

    /**
     * Execute view action
     *
     * @return \Magento\Framework\Controller\ResultInterface
     */
    public function execute()
    {
        $collection = $this->_productCollectionFactory->create();
        $collection->addAttributeToSelect('*');
        $collection->setPageSize(10); // fetching only 10 products
        $result = $this->resultJsonFactory->create();

        $resultData = array();
        foreach($collection as $product) {
            $resultData[] = array(
                'name' => $product->getName(),
                'sku' => $product->getSku(),
                'finalprice' => $product->getFinalPrice()
            );
        }

        /** @var \Magento\Framework\Controller\Result\Json $result */
        return $result->setData($resultData);
    }
}
