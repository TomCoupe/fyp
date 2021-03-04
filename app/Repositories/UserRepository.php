<?php
namespace App\Repositories;

use App\User;

class UserRepository {

    protected $user;

    public function __construct(User $user) {

        $this->user = $user;
    }

    public function getNameByID($id) {
        return $this->user->where('id', $id)->get();
    }

}