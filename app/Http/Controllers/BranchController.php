<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $branches = QueryBuilder::for(Branch::class)
            ->allowedFilters(
                AllowedFilter::partial('name'),
                AllowedFilter::partial('code'),
                AllowedFilter::partial('email'),
                AllowedFilter::partial('phone'),
                AllowedFilter::partial('city'),
                AllowedFilter::partial('country'),
                AllowedFilter::partial('address'),
                AllowedFilter::exact('is_active'),
                AllowedFilter::scope('active', 'whereActive'),
                AllowedFilter::scope('inactive', 'whereInactive')
            )
            ->allowedSorts('name', 'code', 'city', 'country', 'created_at')
            ->defaultSort('-created_at')
            ->paginate($request->input('per_page', 10))
            ->withQueryString();

        return Inertia::render('branch/index', [
            'branches' => $branches,
            'filters' => [
                'filter' => $request->input('filter', []),
                'sort' => $request->input('sort'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Branch $branch)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Branch $branch)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Branch $branch)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Branch $branch)
    {
        //
    }

    public function toggleActive(Branch $branch)
    {
        $branch->update([
            'is_active' => !$branch->is_active
        ]);
        return back();
    }
}
