<?php

class Node{
 
	public $value;                
	public $is_end = false;        
	public $childNode = array();   
	
	public function &addChildNode($value, $is_end = false){
		$node = $this->searchChildNode($value);
		if(empty($node)){
			$node = new Node();
			$node->value = $value;
			$this->childNode[] = $node;
		}
		$node->is_end = $is_end;
		return $node;
	}
 
	/* 查询子节点 */
	public function searchChildNode($value){
		foreach ($this->childNode as $k => $v) {
			if($v->value == $value){
				return $this->childNode[$k];
			}
		}
		return false;
	}
}
 
 
 
function addString(&$head, $str){
	$node = null;
	for ($i=0; $i < strlen($str); $i++) {
		if($str[$i] != ' '){
			$is_end = $i != (strlen($str) - 1) ? false : true;
			if($i == 0){
				$node = $head->addChildNode($str[$i], $is_end);
			}else{
				$node = $node->addChildNode($str[$i], $is_end);
			}
		}
	}
}
 
function getChildString($node, $str_array = array(), $str = ''){
	if($node->is_end == true){
		$str_array[] = $str;
	}
	if(empty($node->childNode)){
		return $str_array;
	}else{
		foreach ($node->childNode as $k => $v) {
			$str_array = getChildString($v, $str_array, $str . $v->value);
		}
		return $str_array;
	}
}
 
function searchString($node, $str){
	for ($i=0; $i < strlen($str); $i++) {
		if($str[$i] != ' '){
			$node = $node->searchChildNode($str[$i]);
			// print_r($node);
			if(empty($node)){

				return false;
			}
		}
	}
	return getChildString($node);
}

?>