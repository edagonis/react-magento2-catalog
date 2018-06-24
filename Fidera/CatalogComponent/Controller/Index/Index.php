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

    protected $productRepository;

    protected $resultPageFactory;

    /**
     * Constructor
     *
     * @param \Magento\Framework\App\Action\Context  $context
     * @param \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory,
     * @param \Magento\Catalog\Model\ResourceModel\Product\CollectionFactory $productCollectionFactory,
     * @param \Magento\Catalog\Api\ProductRepositoryInterface $productRepository
     * @param \Magento\Catalog\Helper\Image $productImageHelper
     * @param \Magento\Framework\View\Result\PageFactory $resultPageFactory
     */
    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory,
        \Magento\Catalog\Model\ResourceModel\Product\CollectionFactory $productCollectionFactory,
        \Magento\Catalog\Api\ProductRepositoryInterface $productRepository,
        \Magento\Framework\View\Result\PageFactory $resultPageFactory,
        \Magento\Framework\Data\Form\FormKey $formKey,
        //\Magento\Catalog\Helper\Image $productImageHelper,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->_resultJsonFactory = $resultJsonFactory;
        $this->_productCollectionFactory = $productCollectionFactory;
        $this->_productRepository = $productRepository;
        $this->_resultPageFactory = $resultPageFactory;
        $this->_formKey = $formKey;
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
        $productSku = $this->_request->getParam('sku');
        $resultJson = $this->_resultJsonFactory->create();

        // Return product information by id
        if ($productSku) {
            $productInfo = $this->getProductInfo(false, $productSku);

            if ($productInfo) {
                return $resultJson->setData($productInfo);
            }
            return $resultJson->setData(array('error' => 'Can\t found a product with sku ' . $productSku));
        }


        $collection = $this->_productCollectionFactory->create();
        $collection->addAttributeToSelect('*');
        $collection->setPageSize(10); // fetching only 10 products

        $resultData = array();
        foreach($collection as $product) {
            $resultData[] = $this->getProductInfo($product, null);
        }

        /** @var \Magento\Framework\Controller\Result\Json $result */
        return $resultJson->setData($resultData);
    }

    public function getProductInfo($_product = false, $productSku)
    {
        if (!$_product) {
            try {
                $_product = $this->_productRepository->get($productSku);
            } catch (\Magento\Framework\Exception\NoSuchEntityException $e){
                return false;
            }
        }

        $resultPage = $this->_resultPageFactory->create();
        $listProductBlock = $resultPage->getLayout()->createBlock('\Magento\Catalog\Block\Product\ListProduct');
        $addToCartUrl = $listProductBlock->getAddToCartUrl($_product);


        $productInfo = array(
            'name' => $_product->getName(),
            'sku' => $_product->getSku(),
            'finalprice' => $_product->getFinalPrice(),
            'addToCartUrl' => $addToCartUrl,
            'formKey' => $this->_formKey->getFormKey(),
            'imageUrl' => $_product->getImage(),
        );

        return $productInfo;
    }
}
